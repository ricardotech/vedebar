import { test, expect } from '@playwright/test';

// Test data
const testFormData = {
  name: 'João da Silva',
  email: 'joao.silva@teste.com',
  phone: '11999887766'
};

test.describe('Reservation Modal Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the frontend
    await page.goto('/');
    
    // Wait for the page to load and intro animation to complete
    // The site has an intro animation that can take some time
    await page.waitForTimeout(5000);
    
    // Wait for the reserve button to be visible (indicates animation is done)
    await page.waitForSelector('button:has-text("Reservar")', { timeout: 30000 });
  });

  test('should open reservation modal when clicking reserve button', async ({ page }) => {
    // Wait for and find the "Reservar" button in the ExperienceSection
    const reserveButton = page.getByRole('button', { name: 'Reservar' });
    await expect(reserveButton).toBeVisible();

    // Click the reserve button
    await reserveButton.click();

    // Verify that the modal is visible - wait for it to animate in
    await page.waitForTimeout(1000);
    
    // Verify the modal content
    await expect(page.getByText('Reserve o Bar para seu Evento')).toBeVisible();
  });

  test('should validate required fields before submission', async ({ page }) => {
    // Set up network monitoring to verify no API call is made with empty form
    let apiCallMade = false;
    await page.route('**/lead', async route => {
      apiCallMade = true;
      await route.continue();
    });

    // Open the modal
    const reserveButton = page.getByRole('button', { name: 'Reservar' });
    await reserveButton.click();
    
    // Wait for modal to be visible
    await expect(page.getByText('Reserve o Bar para seu Evento')).toBeVisible();

    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: 'Solicitar Orçamento' });
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // Wait and check that no API call was made (validation prevented submission)
    await page.waitForTimeout(2000);
    expect(apiCallMade).toBe(false);

    // Check that the modal is still open (form didn't submit successfully)
    await expect(page.getByText('Reserve o Bar para seu Evento')).toBeVisible();
  });

  test('should successfully submit form and integrate with backend API', async ({ page }) => {
    // Intercept the API call to the backend (running on port 3003)
    await page.route('**/lead', async route => {
      const request = route.request();
      const postData = request.postData();
      
      // Verify the request payload
      expect(postData).toContain(testFormData.name);
      expect(postData).toContain(testFormData.email);
      expect(postData).toContain('99988-7766'); // Phone should be present with formatting
      
      // Mock successful response
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Lead enviado com sucesso',
          success: true,
          timestamp: new Date().toISOString()
        })
      });
    });

    // Open the modal
    const reserveButton = page.getByRole('button', { name: 'Reservar' });
    await reserveButton.click();
    
    // Wait for modal to be visible
    await expect(page.getByText('Reserve o Bar para seu Evento')).toBeVisible();

    // Fill the required form fields using name attributes
    await page.locator('input[name="name"]').fill(testFormData.name);
    await page.locator('input[name="email"]').fill(testFormData.email);
    await page.locator('input[name="phone"]').fill(testFormData.phone);

    // Submit the form
    const submitButton = page.getByRole('button', { name: 'Solicitar Orçamento' });
    await submitButton.click();

    // Wait for success message
    await expect(page.getByText('Solicitação enviada com sucesso! Entraremos em contato em até 24 horas.')).toBeVisible();
    
    // Verify that the modal closes after success (it closes after 3 seconds)
    await page.waitForTimeout(3500);
    await expect(page.getByText('Reserve o Bar para seu Evento')).not.toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Intercept the API call and simulate an error
    await page.route('**/lead', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Erro interno do servidor'
        })
      });
    });

    // Open the modal
    const reserveButton = page.getByRole('button', { name: 'Reservar' });
    await reserveButton.click();
    
    // Wait for modal to be visible
    await expect(page.getByText('Reserve o Bar para seu Evento')).toBeVisible();

    // Fill the required form fields
    await page.locator('input[name="name"]').fill(testFormData.name);
    await page.locator('input[name="email"]').fill(testFormData.email);
    await page.locator('input[name="phone"]').fill(testFormData.phone);

    // Submit the form
    const submitButton = page.getByRole('button', { name: 'Solicitar Orçamento' });
    await submitButton.click();

    // Wait for error message
    await expect(page.getByText(/erro ao enviar/i)).toBeVisible();
  });

  test('should format phone number correctly', async ({ page }) => {
    // Open the modal
    const reserveButton = page.getByRole('button', { name: 'Reservar' });
    await reserveButton.click();
    
    // Wait for modal to be visible
    await expect(page.getByText('Reserve o Bar para seu Evento')).toBeVisible();

    // Type phone number and check formatting
    const phoneInput = page.locator('input[name="phone"]');
    await phoneInput.fill('11999887766');
    
    // Check that it formats to Brazilian phone format
    await expect(phoneInput).toHaveValue('(11) 99988-7766');
  });

  test('should close modal when clicking close button', async ({ page }) => {
    // Open the modal
    const reserveButton = page.getByRole('button', { name: 'Reservar' });
    await reserveButton.click();
    
    // Wait for modal to be visible
    await expect(page.getByText('Reserve o Bar para seu Evento')).toBeVisible();

    // Click the close button (X) - look for the SVG path that represents X
    await page.locator('button svg').first().click();

    // Verify modal is closed
    await expect(page.getByText('Reserve o Bar para seu Evento')).not.toBeVisible();
  });

  test('should close modal when clicking outside of it', async ({ page }) => {
    // Open the modal
    const reserveButton = page.getByRole('button', { name: 'Reservar' });
    await reserveButton.click();
    
    // Wait for modal to be visible
    await expect(page.getByText('Reserve o Bar para seu Evento')).toBeVisible();

    // Click outside the modal (on the backdrop) - look for the modal backdrop
    await page.locator('[style*="backdrop-filter: blur(15px)"]').click({ position: { x: 50, y: 50 } });

    // Verify modal is closed
    await expect(page.getByText('Reserve o Bar para seu Evento')).not.toBeVisible();
  });

  test('should test actual backend API integration (when servers are running)', async ({ page }) => {
    // Skip this test if we're mocking API calls - only run against real backend
    test.skip(process.env.MOCK_API === 'true', 'Skipping real API test when mocking is enabled');
    
    // This test will make actual API calls to verify end-to-end integration
    // Open the modal
    const reserveButton = page.getByRole('button', { name: 'Reservar' });
    await reserveButton.click();
    
    // Wait for modal to be visible
    await expect(page.getByText('Reserve o Bar para seu Evento')).toBeVisible();

    // Fill the required form fields with unique test data
    const timestamp = Date.now();
    const uniqueEmail = `test.${timestamp}@example.com`;
    
    await page.locator('input[name="name"]').fill(`Test User ${timestamp}`);
    await page.locator('input[name="email"]').fill(uniqueEmail);
    await page.locator('input[name="phone"]').fill('11999887766');

    // Submit the form
    const submitButton = page.getByRole('button', { name: 'Solicitar Orçamento' });
    await submitButton.click();

    // Wait for success message (this will fail if backend is not running or has issues)
    await expect(page.getByText('Solicitação enviada com sucesso! Entraremos em contato em até 24 horas.')).toBeVisible({ timeout: 10000 });
  });
});
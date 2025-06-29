# Email Setup for Password Reset Functionality

## Gmail Configuration

To enable password reset emails, you need to configure Gmail SMTP settings in the `application.properties` file.

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. Go to your Google Account settings
2. Navigate to Security
3. Under "2-Step Verification", click on "App passwords"
4. Select "Mail" as the app and "Other" as the device
5. Generate the app password
6. Copy the 16-character password

### Step 3: Update application.properties
Replace the placeholder values in `src/main/resources/application.properties`:

```properties
# Email Configuration (Gmail SMTP)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-actual-gmail@gmail.com
spring.mail.password=your-16-character-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.properties.mail.smtp.ssl.trust=smtp.gmail.com
```

### Important Notes:
- Use your actual Gmail address (not the placeholder)
- Use the 16-character app password (not your regular Gmail password)
- Never commit your actual email credentials to version control
- Consider using environment variables for production deployments

### Testing:
After configuration, the password reset functionality will:
1. Send a reset token via email when user requests password reset
2. Send confirmation email when password is successfully changed
3. Handle email sending errors gracefully 
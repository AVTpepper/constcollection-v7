"""
Email utilities for order confirmations using Resend.
"""
import resend
from django.conf import settings

resend.api_key = settings.RESEND_API_KEY


def send_order_confirmation(order_data):
    """Send order confirmation email to customer."""
    
    # Build items HTML
    items_html = ""
    for item in order_data.get('items', []):
        items_html += f"""
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">{item.get('name', 'Item')}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">{item.get('quantity', 1)}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${item.get('price', '0.00')}</td>
        </tr>
        """
    
    # Build address
    address_parts = [
        order_data.get('address', ''),
        order_data.get('city', ''),
    ]
    if order_data.get('state'):
        address_parts.append(order_data.get('state'))
    address_parts.extend([
        order_data.get('zip_code', ''),
        order_data.get('country', ''),
    ])
    address_html = '<br>'.join(filter(None, address_parts))
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="text-align: center; padding: 30px 0; border-bottom: 2px solid #3730A3;">
            <h1 style="color: #3730A3; margin: 0; font-size: 28px;">ConstCollection</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0;">Art by Cecilia Kristoffersson</p>
        </div>
        
        <!-- Thank You Message -->
        <div style="padding: 30px 0; text-align: center;">
            <h2 style="color: #3730A3; margin: 0 0 10px 0;">Thank You for Your Order!</h2>
            <p style="color: #6b7280; margin: 0;">
                Hi {order_data.get('first_name', 'there')}, your order has been confirmed.
            </p>
        </div>
        
        <!-- Order Details -->
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0; color: #3730A3;">Order #{order_data.get('id', 'N/A')}</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #3730A3; color: white;">
                        <th style="padding: 12px; text-align: left; border-radius: 4px 0 0 0;">Item</th>
                        <th style="padding: 12px; text-align: center;">Qty</th>
                        <th style="padding: 12px; text-align: right; border-radius: 0 4px 0 0;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items_html}
                </tbody>
            </table>
            
            <!-- Totals -->
            <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #e5e7eb;">
                <table style="width: 100%;">
                    <tr>
                        <td style="padding: 5px 0;">Subtotal:</td>
                        <td style="text-align: right;">${order_data.get('subtotal', '0.00')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 0;">Shipping:</td>
                        <td style="text-align: right;">${order_data.get('shipping', '0.00')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 0;">Tax:</td>
                        <td style="text-align: right;">${order_data.get('tax', '0.00')}</td>
                    </tr>
                    <tr style="font-weight: bold; font-size: 18px;">
                        <td style="padding: 10px 0; border-top: 2px solid #3730A3;">Total:</td>
                        <td style="text-align: right; padding: 10px 0; border-top: 2px solid #3730A3; color: #3730A3;">${order_data.get('total', '0.00')}</td>
                    </tr>
                </table>
            </div>
        </div>
        
        <!-- Shipping Address -->
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #3730A3;">Shipping Address</h3>
            <p style="margin: 0; color: #4b5563;">
                {order_data.get('first_name', '')} {order_data.get('last_name', '')}<br>
                {address_html}
            </p>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 30px 0; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p style="margin: 0 0 10px 0;">
                Questions? Reply to this email or contact us at<br>
                <a href="mailto:cecilia.kristoffersson@gmail.com" style="color: #3730A3;">cecilia.kristoffersson@gmail.com</a>
            </p>
            <p style="margin: 0;">
                © 2026 ConstCollection. All rights reserved.
            </p>
        </div>
        
    </body>
    </html>
    """
    
    to_email = order_data.get('email')
    if not to_email:
        print("ERROR: No email address provided in order_data")
        return None
    
    print(f"Sending order confirmation to: {to_email}")
    
    # ============================================================
    # PRODUCTION SETUP:
    # 1. Verify your domain at resend.com/domains
    # 2. Update DEFAULT_FROM_EMAIL in settings.py to your domain
    #    e.g., 'orders@constcollection.com'
    # 3. Remove RESEND_VERIFIED_EMAIL and send directly to to_email:
    #    "to": to_email,
    # 4. Remove the "TEST MODE" prefix from subject and html
    # ============================================================
    
    # TEST MODE: Until domain is verified, emails can only go to account owner
    RESEND_VERIFIED_EMAIL = 'alexander.tastad@gmail.com'
    
    try:
        response = resend.Emails.send({
            "from": settings.DEFAULT_FROM_EMAIL,
            "to": RESEND_VERIFIED_EMAIL,  # Send to verified email for testing
            "subject": f"Order Confirmation - ConstCollection #{order_data.get('id', '')} (Customer: {to_email})",
            "html": f"<p><strong>⚠️ TEST MODE: This email would be sent to {to_email}</strong></p><hr>" + html_content,
        })
        print(f"Email sent successfully! Response: {response}")
        return response
    except Exception as e:
        print(f"Failed to send order confirmation email: {e}")
        import traceback
        traceback.print_exc()
        return None

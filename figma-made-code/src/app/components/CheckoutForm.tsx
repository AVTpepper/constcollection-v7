import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface CheckoutFormProps {
  total: number;
  onSubmit?: (data: any) => void;
}

export function CheckoutForm({ total, onSubmit }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Payment (mock Stripe fields)
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Information */}
      <section>
        <h2 className="font-['Playfair_Display'] text-2xl mb-6">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="font-['Inter']">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
              className="font-['Inter']"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="font-['Inter']">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
              className="font-['Inter']"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="email" className="font-['Inter']">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="font-['Inter']"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address" className="font-['Inter']">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              required
              className="font-['Inter']"
            />
          </div>
          <div>
            <Label htmlFor="city" className="font-['Inter']">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              required
              className="font-['Inter']"
            />
          </div>
          <div>
            <Label htmlFor="state" className="font-['Inter']">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              required
              className="font-['Inter']"
            />
          </div>
          <div>
            <Label htmlFor="zipCode" className="font-['Inter']">ZIP Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              required
              className="font-['Inter']"
            />
          </div>
          <div>
            <Label htmlFor="country" className="font-['Inter']">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              required
              className="font-['Inter']"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* Payment Information */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="h-5 w-5 text-[#3730A3]" />
          <h2 className="font-['Playfair_Display'] text-2xl">Payment Information</h2>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-['Inter']">
            <Lock className="h-4 w-4" />
            <span>Secured by Stripe</span>
          </div>

          <div>
            <Label htmlFor="cardName" className="font-['Inter']">Cardholder Name</Label>
            <Input
              id="cardName"
              value={formData.cardName}
              onChange={(e) => handleChange('cardName', e.target.value)}
              placeholder="John Doe"
              required
              className="font-['Inter']"
            />
          </div>

          <div>
            <Label htmlFor="cardNumber" className="font-['Inter']">Card Number</Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleChange('cardNumber', e.target.value)}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              required
              className="font-['Inter']"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate" className="font-['Inter']">Expiry Date</Label>
              <Input
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => handleChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                required
                className="font-['Inter']"
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="font-['Inter']">CVV</Label>
              <Input
                id="cvv"
                type="password"
                value={formData.cvv}
                onChange={(e) => handleChange('cvv', e.target.value)}
                placeholder="123"
                maxLength={4}
                required
                className="font-['Inter']"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 font-['Inter'] mt-4">
            Your payment information is encrypted and secure. We never store your card details.
          </p>
        </div>
      </section>

      {/* Submit Button */}
      <Button 
        type="submit"
        className="w-full bg-[#FF6B6B] hover:bg-[#EE5A52] text-white py-6"
        size="lg"
      >
        <Lock className="mr-2 h-5 w-5" />
        <span className="font-['Inter']">Place Order - ${total.toFixed(2)}</span>
      </Button>

      <p className="text-center text-xs text-gray-500 font-['Inter']">
        By placing your order, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
}


import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, CheckCircle, Edit, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import BillingTabsLink from './BillingTabsLink';
import { useNavigate } from 'react-router-dom';

const PaymentMethods = () => {
  const [cards, setCards] = useState([
    { id: 1, type: 'visa', last4: '4242', expMonth: 12, expYear: 25, isDefault: true },
    { id: 2, type: 'mastercard', last4: '5555', expMonth: 10, expYear: 24, isDefault: false }
  ]);
  
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardName: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  });
  const navigate = useNavigate();

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <div className="hz-fg-muted hz-w-bold hz-t-xs">VISA</div>;
      case 'mastercard':
        return <div className="hz-fg-muted hz-w-bold hz-t-xs">MC</div>;
      default:
        return <CreditCard className="hz-sq-2 hz-fg-muted" />;
    }
  };

  const setDefaultCard = (id: number) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
    
    toast.success('Default payment method updated');
  };
  
  const handleAddCard = () => {
    setShowAddCard(true);
  };
  
  const handleCloseAddCard = () => {
    setShowAddCard(false);
    setNewCard({
      cardNumber: '',
      cardName: '',
      expMonth: '',
      expYear: '',
      cvc: ''
    });
  };
  
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!newCard.cardNumber || !newCard.cardName || !newCard.expMonth || !newCard.expYear || !newCard.cvc) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Add new card
    const cardType = newCard.cardNumber.startsWith('4') ? 'visa' : 'mastercard';
    const last4 = newCard.cardNumber.slice(-4);
    
    setCards([
      ...cards,
      {
        id: Date.now(),
        type: cardType,
        last4,
        expMonth: parseInt(newCard.expMonth),
        expYear: parseInt(newCard.expYear),
        isDefault: false
      }
    ]);
    
    toast.success('Payment method added successfully');
    handleCloseAddCard();
    
    // Navigate back to overview after adding card to continue user journey
    navigate('/account/billing#overview');
  };
  
  const handleDeleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
    toast.success('Payment method removed');
  };

  return (
    <div className="hz-stack-6">
      <div className="hz-row hz-ai-center hz-jc-between">
        <div className="hz-row hz-ai-center">
          <BillingTabsLink tabId="overview" variant="ghost">
            <ArrowLeft className="hz-sq-2 hz-mr-2" /> Back to Overview
          </BillingTabsLink>
        </div>
        <Button onClick={handleAddCard}>
          <Plus className="hz-sq-2 hz-mr-2" />
          Add Payment Method
        </Button>
      </div>
      
      {/* Add new card form */}
      {showAddCard && (
        <div className="hz-card">
          <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
            <h3 className="hz-t-lg hz-w-medium">Add Payment Method</h3>
            <Button variant="ghost" size="sm" onClick={handleCloseAddCard}>
              <X className="hz-sq-2" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmitCard} className="hz-stack-4">
            <div className="hz-stack-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                name="cardName"
                placeholder="John Doe"
                value={newCard.cardName}
                onChange={handleCardInputChange}
                className="hz-bg-raised"
              />
            </div>
            
            <div className="hz-stack-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={newCard.cardNumber}
                onChange={handleCardInputChange}
                className="hz-bg-raised"
              />
            </div>
            
            <div className="hz-grid hz-grid-3 hz-gap-4">
              <div className="hz-stack-2">
                <Label htmlFor="expMonth">Month</Label>
                <Input
                  id="expMonth"
                  name="expMonth"
                  placeholder="MM"
                  maxLength={2}
                  value={newCard.expMonth}
                  onChange={handleCardInputChange}
                  className="hz-bg-raised"
                />
              </div>
              
              <div className="hz-stack-2">
                <Label htmlFor="expYear">Year</Label>
                <Input
                  id="expYear"
                  name="expYear"
                  placeholder="YY"
                  maxLength={2}
                  value={newCard.expYear}
                  onChange={handleCardInputChange}
                  className="hz-bg-raised"
                />
              </div>
              
              <div className="hz-stack-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  name="cvc"
                  placeholder="123"
                  maxLength={3}
                  value={newCard.cvc}
                  onChange={handleCardInputChange}
                  className="hz-bg-raised"
                />
              </div>
            </div>
            
            <Button type="submit" className="hz-w-full hz-mt-4">
              Add Payment Method
            </Button>
          </form>
        </div>
      )}
      
      {/* Cards list */}
      <div className="hz-stack-4">
        {cards.map(card => (
          <div 
            key={card.id} 
            className={`hz-row hz-ai-center hz-jc-between hz-p-4 hz-r-lg hz-bordered ${
              card.isDefault 
                ? 'hz-border-strong hz-bg-raised' 
                : 'hz-bg-surface'
            }`}
          >
            <div className="hz-row hz-ai-center">
              <div className="hz-bh-6 hz-bw-7 hz-bg-raised hz-r-md hz-row hz-ai-center hz-jc-center hz-mr-4">
                {getCardIcon(card.type)}
              </div>
              <div>
                <div className="hz-w-medium">
                  {card.type.charAt(0).toUpperCase() + card.type.slice(1)} ending in {card.last4}
                  {card.isDefault && (
                    <span className="hz-ml-2 hz-t-xs hz-bg-raised hz-fg-soft hz-px-2 hz-py-1 hz-r-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="hz-t-sm hz-fg-muted">Expires {card.expMonth}/{card.expYear}</div>
              </div>
            </div>
            
            <div className="hz-row hz-ai-center hz-inline-2">
              {!card.isDefault && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setDefaultCard(card.id)}
                >
                  <CheckCircle className="hz-sq-2 hz-mr-2" />
                  Set Default
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Edit className="hz-sq-2 hz-mr-2" />
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hz-fg-muted hz-link"
                onClick={() => handleDeleteCard(card.id)}
              >
                <Trash2 className="hz-sq-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="hz-card">
        <h3 className="hz-t-lg hz-w-medium hz-mb-4">Billing Address</h3>
        <div className="hz-stack-1 hz-mb-4">
          <div>Jane Doe</div>
          <div>123 Main St</div>
          <div>San Francisco, CA 94105</div>
          <div>United States</div>
        </div>
        <Button variant="outline" size="sm">
          <Edit className="hz-sq-2 hz-mr-2" />
          Edit Address
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethods;

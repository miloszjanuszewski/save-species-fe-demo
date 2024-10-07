
import React, { useState, useEffect } from 'react';
import { useDonationStore } from '../../stores/donationStore';
import './DonationModal.css';
import { useNotificationStore } from '../../stores/notificationStore';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  speciesName: string;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, speciesName }) => {
  const [value, setValue] = useState('');
  const addDonation = useDonationStore((state) => state.addDonation);
  const addNotification = useNotificationStore((state) => state.addNotification);

  
  useEffect(() => {
    if (isOpen) {
      setValue('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDonation({ name: speciesName, value: parseFloat(value) });
    onClose();
    addNotification(`Thank you for donating $${parseFloat(value).toFixed(2)} to ${speciesName}!`);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-modal-title"
      >
        <h2 id="donation-modal-title">Donate to {speciesName}</h2>
        <form onSubmit={handleSubmit} className="donation-form">
          <div className="form-group">
            <label htmlFor="donation-value">Donation Amount:</label>
            <input
              type="number"
              id="donation-value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              min="1"
              step="any"
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="donate-button">
              Donate
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;

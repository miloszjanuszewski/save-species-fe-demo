
import React, { useState } from 'react';
import {SearchBar} from '../../components';
import './YourDonationsSection.css';
import { useDonationStore } from '../../stores/donationStore';
import initialDonationsData from '../../data/donation-data.json';

interface Donation {
  name: string;
  value: number;
}

const YourDonationsSection: React.FC = () => {
  const donationStoreDonations = useDonationStore((state) => state.donations);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Donation; direction: 'ascending' | 'descending' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  
  const combinedDonations = React.useMemo(() => {
    const initialDonations: Donation[] = initialDonationsData;
    return [...initialDonations, ...donationStoreDonations];
  }, [donationStoreDonations]);

  const sortedDonations = React.useMemo(() => {
    let sortableDonations = [...combinedDonations];

    if (searchQuery) {
      sortableDonations = sortableDonations.filter((donation) =>
        donation.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortConfig !== null) {
      sortableDonations.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableDonations;
  }, [combinedDonations, sortConfig, searchQuery]);

  const requestSort = (key: keyof Donation) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <section id="your-donations-section" className="your-donations-section">
      <h2>Your Donations</h2>
      <SearchBar
        placeholder="Search your donations..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <table className="donations-table">
        <thead>
          <tr>
            <th
              scope="col"
              onClick={() => requestSort('name')}
              className={
                sortConfig?.key === 'name'
                  ? sortConfig.direction === 'ascending'
                    ? 'sorted-ascending'
                    : 'sorted-descending'
                  : undefined
              }
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && requestSort('name')}
            >
              Name
            </th>
            <th
              scope="col"
              onClick={() => requestSort('value')}
              className={
                sortConfig?.key === 'value'
                  ? sortConfig.direction === 'ascending'
                    ? 'sorted-ascending'
                    : 'sorted-descending'
                  : undefined
              }
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && requestSort('value')}
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedDonations.length > 0 ? (
            sortedDonations.map((donation, index) => (
              <tr key={index}>
                <td>{donation.name}</td>
                <td>${donation.value.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>
                No donations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default YourDonationsSection;

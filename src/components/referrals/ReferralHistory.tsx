
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface ReferralRecord {
  id: number;
  name: string;
  email: string;
  status: string;
  date: string;
  credits: number;
}

interface ReferralHistoryProps {
  referralHistory: ReferralRecord[];
}

const ReferralHistory = ({ referralHistory }: ReferralHistoryProps) => {
  return (
    <div className="hz-card">
      <h2 className="hz-t-xl hz-w-medium hz-mb-4">Referral History</h2>
      
      <div className="hz-r-lg hz-bordered hz-clip">
        <Table>
          <TableHeader className="hz-bg-surface">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hz-align-right">Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referralHistory.map((referral) => (
              <TableRow key={referral.id} className="">
                <TableCell className="hz-w-medium">{referral.name}</TableCell>
                <TableCell>{referral.email}</TableCell>
                <TableCell>{referral.date}</TableCell>
                <TableCell>
                  <span className={`hz-px-2 hz-py-1 hz-r-full hz-t-xs ${
                    referral.status === 'Completed' 
                      ? 'hz-bg-raised hz-fg-soft' 
                      : 'hz-bg-raised hz-fg-soft'
                  }`}>
                    {referral.status}
                  </span>
                </TableCell>
                <TableCell className="hz-align-right">
                  {referral.credits > 0 ? `$${referral.credits}` : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReferralHistory;

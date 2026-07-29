
import React from 'react';
import { Download, ArrowLeft, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import BillingTabsLink from './BillingTabsLink';

const BillingHistory = () => {
  const invoices = [
    { id: 'INV-001', date: 'Jun 15, 2024', amount: '$49.00', status: 'Paid', description: 'Pro Plan - Monthly' },
    { id: 'INV-002', date: 'May 15, 2024', amount: '$49.00', status: 'Paid', description: 'Pro Plan - Monthly' },
    { id: 'INV-003', date: 'Apr 15, 2024', amount: '$49.00', status: 'Paid', description: 'Pro Plan - Monthly' },
    { id: 'INV-004', date: 'Mar 15, 2024', amount: '$49.00', status: 'Paid', description: 'Pro Plan - Monthly' },
    { id: 'INV-005', date: 'Feb 15, 2024', amount: '$49.00', status: 'Paid', description: 'Pro Plan - Monthly' },
  ];

  /* A role from src/styles/system.css, never a framework utility. */
  const getStatusColor = (_status: string) => 'hz-bg-surface hz-fg-muted';

  return (
    <div className="hz-stack-6">
      <div className="hz-row hz-ai-center hz-jc-between">
        <BillingTabsLink tabId="overview" variant="ghost">
          <ArrowLeft className="hz-sq-2 hz-mr-2" /> Back to Overview
        </BillingTabsLink>
        <Button variant="outline">
          <Filter className="hz-sq-2 hz-mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="hz-card">
        <h3 className="hz-t-xl hz-w-medium hz-mb-5">Invoice History</h3>
        
        <div className="hz-scroll-x">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hz-align-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell className="hz-w-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <span className={`hz-px-2 hz-py-1 hz-r-full hz-t-xs ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="hz-align-right">
                    <Button variant="ghost" size="sm">
                      <Download className="hz-sq-2 hz-mr-2" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BillingHistory;

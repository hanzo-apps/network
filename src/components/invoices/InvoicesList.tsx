
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Filter, Calendar, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const cardAnimation = createAnimationVariant("fadeInBlur", {
  duration: 0.4,
  curve: curves.snappy,
  distance: 15
});

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  amount: string;
  status: "Paid" | "Due" | "Overdue" | "Processing";
}

const InvoicesList = () => {
  const [filter, setFilter] = useState("all");
  
  // Mock data for invoices
  const invoices: Invoice[] = [
    {
      id: "INV-20230301",
      date: "Mar 1, 2023",
      dueDate: "Mar 15, 2023",
      amount: "$20.00",
      status: "Paid"
    },
    {
      id: "INV-20230401",
      date: "Apr 1, 2023",
      dueDate: "Apr 15, 2023",
      amount: "$20.00",
      status: "Paid"
    },
    {
      id: "INV-20230501",
      date: "May 1, 2023",
      dueDate: "May 15, 2023",
      amount: "$25.00",
      status: "Paid"
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === "all") return true;
    return invoice.status.toLowerCase() === filter;
  });

  const statusColors = {
    Paid: "bg-neutral-800/30 text-neutral-400",
    Due: "bg-neutral-800/30 text-neutral-400",
    Overdue: "bg-neutral-800/30 text-neutral-400",
    Processing: "bg-neutral-800/30 text-neutral-400"
  };

  return (
    <motion.div 
      variants={cardAnimation}
      className="hz-r-lg hz-bordered hz-bg-overlay hz-clip"
    >
      <div className="hz-col-row hz-p-5 hz-border-b hz-jc-between hz-ai-start hz-gap-4">
        <div className="hz-row hz-ai-center hz-gap-3">
          <Calendar className="hz-sq-3 hz-fg-muted" />
          <div className="hz-stack-1">
            <h3 className="hz-t-xl hz-w-medium">Invoice History</h3>
            <p className="hz-t-sm hz-fg-muted">View and download past invoices</p>
          </div>
        </div>
        
        <div className="hz-row hz-ai-center hz-gap-2">
          <Button variant="outline" size="sm" className="hz-bg hz-hoverable">
            <Filter className="hz-sq-2 hz-mr-2" />
            Filter
          </Button>
          
          <Button className="hz-bg-inverse hz-fg-inverse hz-hoverable">
            <Download className="hz-sq-2 hz-mr-2" />
            Export All
          </Button>
        </div>
      </div>
      
      {filteredInvoices.length > 0 ? (
        <div className="hz-scroll-x">
          <Table>
            <TableHeader className="hz-bg">
              <TableRow className="hz-border-b hz-hoverable">
                <TableHead className="hz-fg-muted hz-w-medium hz-py-3 hz-px-5">Invoice</TableHead>
                <TableHead className="hz-fg-muted hz-w-medium hz-py-3 hz-px-5">Date</TableHead>
                <TableHead className="hz-fg-muted hz-w-medium hz-py-3 hz-px-5">Due Date</TableHead>
                <TableHead className="hz-fg-muted hz-w-medium hz-py-3 hz-px-5">Amount</TableHead>
                <TableHead className="hz-fg-muted hz-w-medium hz-py-3 hz-px-5">Status</TableHead>
                <TableHead className="hz-align-right hz-fg-muted hz-w-medium hz-py-3 hz-px-5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hz-border-t hz-hoverable">
                  <TableCell className="hz-py-4 hz-px-5">{invoice.id}</TableCell>
                  <TableCell className="hz-py-4 hz-px-5">{invoice.date}</TableCell>
                  <TableCell className="hz-py-4 hz-px-5">{invoice.dueDate}</TableCell>
                  <TableCell className="hz-py-4 hz-px-5">{invoice.amount}</TableCell>
                  <TableCell className="hz-py-4 hz-px-5">
                    <span className={`hz-px-2 hz-py-1 hz-r-full hz-t-xs ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="hz-py-4 hz-px-5 hz-align-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="hz-fg-muted hz-link"
                    >
                      <Download className="hz-sq-2 hz-mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="hz-py-7 hz-align-center">
          <FileText className="hz-sq-7 hz-mx-auto hz-mb-4 hz-fg-faint" />
          <h3 className="hz-t-xl hz-w-medium hz-mb-2">No Invoices Found</h3>
          <p className="hz-container-narrow hz-mw-sm hz-fg-muted">
            Once you start using our services, your invoices will appear here.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default InvoicesList;

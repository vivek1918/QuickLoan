import { crmData, Customer } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface CustomerSelectorProps {
  selectedCustomer: Customer | null;
  onSelect: (customer: Customer) => void;
}

export const CustomerSelector = ({ selectedCustomer, onSelect }: CustomerSelectorProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <User className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {t('selectCustomerLabel')}
        </label>
        <Select
          value={selectedCustomer?.customer_id}
          onValueChange={(value) => {
            const customer = crmData.find((c) => c.customer_id === value);
            if (customer) onSelect(customer);
          }}
        >
          <SelectTrigger className="mt-1 border-0 bg-transparent p-0 h-auto text-foreground font-medium focus:ring-0">
            <SelectValue placeholder={t('chooseCustomer')} />
          </SelectTrigger>
          <SelectContent>
            {crmData.map((customer) => (
              <SelectItem key={customer.customer_id} value={customer.customer_id}>
                <div className="flex flex-col">
                  <span className="font-medium">{customer.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {customer.phone} • {customer.address}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

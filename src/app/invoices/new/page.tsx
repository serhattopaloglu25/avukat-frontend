'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Receipt } from 'lucide-react';
import { apiService, type Client } from '@/services/api.service';

export default function NewInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState({
    invoice_number: '',
    client_id: '',
    amount: '',
    tax: '18',
    status: 'draft',
    due_date: '',
    notes: ''
  });

  useEffect(() => {
    loadClients();
    // Generate invoice number
    const invoiceNo = `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    setFormData(prev => ({ ...prev, invoice_number: invoiceNo }));
  }, []);

  const loadClients = async () => {
    try {
      const data = await apiService.getClients();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const calculateTotal = () => {
    const amount = parseFloat(formData.amount) || 0;
    const tax = parseFloat(formData.tax) || 0;
    const taxAmount = (amount * tax) / 100;
    return amount + taxAmount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const invoiceData = {
        invoice_number: formData.invoice_number,
        client_id: parseInt(formData.client_id),
        amount: parseFloat(formData.amount),
        tax: parseFloat(formData.tax),
        total: calculateTotal(),
        status: formData.status,
        due_date: formData.due_date,
        notes: formData.notes
      };
      
      const response = await fetch('http://localhost:8000/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
      
      const data = await response.json();
      console.log('Invoice created:', data);
      
      router.push('/invoices');
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Fatura oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Yeni Fatura</h1>
          <p className="text-gray-600 mt-1">Müvekkiliniz için fatura oluşturun</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="invoice_number">Fatura No</Label>
                  <Input
                    id="invoice_number"
                    value={formData.invoice_number}
                    onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="client">Müvekkil *</Label>
                  <Select
                    value={formData.client_id}
                    onValueChange={(value) => setFormData({ ...formData, client_id: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Müvekkil seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id!.toString()}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Tutar (₺) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tax">KDV (%)</Label>
                    <Input
                      id="tax"
                      type="number"
                      value={formData.tax}
                      onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
                      placeholder="18"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Toplam Tutar:</span>
                    <span className="text-2xl font-bold">₺{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Durum</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Taslak</SelectItem>
                        <SelectItem value="sent">Gönderildi</SelectItem>
                        <SelectItem value="paid">Ödendi</SelectItem>
                        <SelectItem value="overdue">Gecikmiş</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="due_date">Vade Tarihi</Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notlar</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Fatura açıklaması veya notlar..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/invoices')}
                >
                  İptal
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || !formData.client_id || !formData.amount}
                >
                  <Receipt className="h-4 w-4 mr-2" />
                  {loading ? 'Oluşturuluyor...' : 'Fatura Oluştur'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
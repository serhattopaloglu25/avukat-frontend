'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  List,
  Grid3X3,
  CalendarDays,
  Bell,
  Briefcase,
  Users,
  FileText,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import apiService from '@/lib/api';

interface Event {
  id: number;
  title: string;
  type: 'hearing' | 'meeting' | 'reminder' | 'deadline';
  description?: string;
  startAt: string;
  endAt?: string;
  location?: string;
  reminders: number[];
  case?: {
    id: number;
    title: string;
    caseNo?: string;
    client?: {
      id: number;
      name: string;
    };
  };
  createdBy?: {
    id: number;
    name: string;
    email: string;
  };
}

type ViewType = 'month' | 'week' | 'day' | 'list';

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewType>('month');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [view, selectedType, currentDate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        view,
        ...(selectedType !== 'all' && { type: selectedType })
      });

      const response = await fetch(`${apiService.baseUrl}/api/events?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Etkinlikler yüklenemedi');

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Etkinlikler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" etkinliğini silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      const response = await fetch(`${apiService.baseUrl}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Etkinlik silinemedi');
        return;
      }

      fetchEvents();
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Etkinlik silinemedi');
    }
  };

  const downloadICS = async () => {
    try {
      const response = await fetch(`${apiService.baseUrl}/api/events/ics?range=30`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Takvim indirilemedi');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'avukatajanda-takvim.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('ICS indirme hatası:', error);
      alert('Takvim dosyası indirilemedi');
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'hearing': return <Briefcase className="h-4 w-4" />;
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'reminder': return <Bell className="h-4 w-4" />;
      case 'deadline': return <Clock className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'hearing': return 'bg-red-100 text-red-800 border-red-200';
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reminder': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'deadline': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getDateRangeText = () => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long' 
    };
    
    if (view === 'day') {
      return currentDate.toLocaleDateString('tr-TR', {
        ...options,
        day: 'numeric'
      });
    } else if (view === 'week') {
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() - currentDate.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('tr-TR', options);
    }
  };

  // Calendar Grid for Month View
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    while (currentDateObj <= lastDay || currentDateObj.getDay() !== 0) {
      days.push(new Date(currentDateObj));
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'].map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dayEvents = events.filter(e => {
            const eventDate = new Date(e.startAt);
            return eventDate.toDateString() === day.toDateString();
          });
          const isCurrentMonth = day.getMonth() === month;
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <div
              key={index}
              className={`bg-white p-2 min-h-[100px] ${
                !isCurrentMonth ? 'opacity-50' : ''
              } ${isToday ? 'bg-blue-50' : ''} cursor-pointer hover:bg-gray-50`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-sm font-medium mb-1">{day.getDate()}</div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded ${getEventTypeColor(event.type)}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/events/${event.id}`);
                    }}
                  >
                    <div className="truncate">{event.title}</div>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{dayEvents.length - 3} daha
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // List View
  const renderListView = () => {
    const groupedEvents = events.reduce((acc, event) => {
      const date = formatDate(event.startAt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {} as Record<string, Event[]>);

    return (
      <div className="space-y-4">
        {Object.entries(groupedEvents).map(([date, dayEvents]) => (
          <Card key={date}>
            <CardHeader className="py-3">
              <CardTitle className="text-base">{date}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${getEventTypeColor(event.type)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getEventTypeIcon(event.type)}</div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <div className="flex flex-col gap-1 mt-1">
                        <p className="text-sm text-gray-600">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {formatTime(event.startAt)}
                          {event.endAt && ` - ${formatTime(event.endAt)}`}
                        </p>
                        {event.location && (
                          <p className="text-sm text-gray-600">
                            <MapPin className="inline h-3 w-3 mr-1" />
                            {event.location}
                          </p>
                        )}
                        {event.case && (
                          <p className="text-sm text-gray-600">
                            <Briefcase className="inline h-3 w-3 mr-1" />
                            {event.case.title}
                            {event.case.client && ` - ${event.case.client.name}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/events/${event.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Görüntüle
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push(`/events/${event.id}/edit`)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(event.id, event.title)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Takvim</h1>
          <p className="text-gray-600 mt-2">Duruşmalar, toplantılar ve hatırlatmalar</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={downloadICS}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            ICS İndir
          </Button>
          <Button 
            onClick={() => router.push('/events/new')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Yeni Etkinlik
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* View Switcher */}
            <div className="flex gap-2">
              <Button
                variant={view === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('month')}
              >
                <Grid3X3 className="h-4 w-4 mr-1" />
                Ay
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('week')}
              >
                <CalendarDays className="h-4 w-4 mr-1" />
                Hafta
              </Button>
              <Button
                variant={view === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('day')}
              >
                <CalendarIcon className="h-4 w-4 mr-1" />
                Gün
              </Button>
              <Button
                variant={view === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('list')}
              >
                <List className="h-4 w-4 mr-1" />
                Liste
              </Button>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium min-w-[200px] text-center">
                {getDateRangeText()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Bugün
              </Button>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Etkinlikler</SelectItem>
                  <SelectItem value="hearing">Duruşmalar</SelectItem>
                  <SelectItem value="meeting">Toplantılar</SelectItem>
                  <SelectItem value="reminder">Hatırlatmalar</SelectItem>
                  <SelectItem value="deadline">Son Tarihler</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar/List View */}
      <Card>
        <CardContent className="p-4">
          {view === 'month' && renderMonthView()}
          {view === 'list' && renderListView()}
          {(view === 'week' || view === 'day') && (
            <div className="text-center py-12 text-gray-500">
              {view === 'week' ? 'Haftalık' : 'Günlük'} görünüm yakında eklenecek
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Date Modal */}
      {selectedDate && view === 'month' && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedDate(null)}
        >
          <Card 
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <CardTitle>
                {selectedDate.toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {events
                .filter(e => new Date(e.startAt).toDateString() === selectedDate.toDateString())
                .length > 0 ? (
                <div className="space-y-2">
                  {events
                    .filter(e => new Date(e.startAt).toDateString() === selectedDate.toDateString())
                    .map(event => (
                      <div
                        key={event.id}
                        className={`p-3 rounded-lg border ${getEventTypeColor(event.type)} cursor-pointer`}
                        onClick={() => router.push(`/events/${event.id}`)}
                      >
                        <div className="flex items-start gap-2">
                          {getEventTypeIcon(event.type)}
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm">
                              {formatTime(event.startAt)}
                              {event.location && ` - ${event.location}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Bu tarihte etkinlik bulunmuyor
                </p>
              )}
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedDate(null)}
                >
                  Kapat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
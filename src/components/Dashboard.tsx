'use client';

import React from 'react';

interface MetricCardProps {
  icon: string;
  value: string | number;
  label: string;
  color: string;
}

interface ActivityItem {
  dot: string;
  text: string;
  time: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, color }) => {
  const colorStyles = {
    blue: { background: '#dbeafe', color: '#3b82f6' },
    yellow: { background: '#fef3c7', color: '#f59e0b' },
    green: { background: '#d1fae5', color: '#10b981' },
    red: { background: '#fee2e2', color: '#ef4444' },
  };

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            ...colorStyles[color as keyof typeof colorStyles],
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1f2937',
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<{ children: React.ReactNode; title?: string; action?: React.ReactNode }> = ({
  children,
  title,
  action,
}) => (
  <div
    style={{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    }}
  >
    {title && (
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#1f2937',
            margin: 0,
          }}
        >
          {title}
        </h3>
        {action}
      </div>
    )}
    <div style={{ padding: '24px' }}>{children}</div>
  </div>
);

const ProgressBar: React.FC<{
  label: string;
  value: string;
  percentage: number;
  color: string;
}> = ({ label, value, percentage, color }) => (
  <div style={{ marginBottom: '16px' }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        marginBottom: '4px',
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div
      style={{
        width: '100%',
        height: '8px',
        background: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          background: color,
          borderRadius: '4px',
          width: `${percentage}%`,
        }}
      />
    </div>
  </div>
);

const QuickActionButton: React.FC<{
  icon: string;
  label: string;
  color: string;
  onClick?: () => void;
}> = ({ icon, label, color, onClick }) => {
  const colorStyles = {
    blue: '#3b82f6',
    green: '#10b981',
    orange: '#f59e0b',
    purple: '#8b5cf6',
  };

  return (
    <button
      onClick={onClick}
      style={{
        padding: '16px',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 600,
        fontSize: '14px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: colorStyles[color as keyof typeof colorStyles],
        color: 'white',
        lineHeight: '1.4',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ fontSize: '16px', marginBottom: '4px' }}>{icon}</div>
      {label}
    </button>
  );
};

const ActivityItemComponent: React.FC<ActivityItem> = ({ dot, text, time }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '16px',
    }}
  >
    <div
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        marginTop: '6px',
        background: dot,
      }}
    />
    <div>
      <div
        style={{
          fontSize: '14px',
          color: '#374151',
        }}
      >
        {text}
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#6b7280',
          marginTop: '2px',
        }}
      >
        {time}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const todayMetrics = [
    { label: 'Görev', value: 5, color: 'blue' },
    { label: 'Randevu', value: 3, color: 'green' },
    { label: 'Duruşma', value: 2, color: 'orange' },
  ];

  const billingMetrics = [
    { icon: '🧾', value: '15', label: 'Taslak Faturalar', color: 'blue' },
    { icon: '⏳', value: '₺85,250', label: 'Devam Eden İş', color: 'yellow' },
    { icon: '✅', value: '₺125,500', label: 'Bu Ay Tahsil', color: 'green' },
    { icon: '⚠️', value: '₺35,750', label: 'Geciken Ödemeler', color: 'red' },
  ];

  const quickActions = [
    { icon: '➕', label: 'Yeni Müvekkil', color: 'blue' },
    { icon: '⚖️', label: 'Yeni Dava', color: 'green' },
    { icon: '⏰', label: 'Zaman Başlat', color: 'orange' },
    { icon: '🧾', label: 'Fatura Oluştur', color: 'purple' },
  ];

  const activities = [
    { dot: '#10b981', text: 'Ahmet Yılmaz için yeni randevu oluşturuldu', time: '2 saat önce' },
    { dot: '#3b82f6', text: 'Boşanma davası için belge yüklendi', time: '4 saat önce' },
    { dot: '#f59e0b', text: 'Fatura #2024-156 ödemesi alındı', time: '1 gün önce' },
  ];

  return (
    <>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#1f2937',
            margin: '0 0 4px 0',
          }}
        >
          Kişisel Dashboard
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: '14px',
            margin: 0,
          }}
        >
          Günlük performansınızın ve firma metriklerinizin özeti
        </p>
      </div>

      {/* Today's Agenda & Hourly Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        <Card title="Bugünün Ajandası">
          <div style={{ display: 'flex', gap: '32px' }}>
            {todayMetrics.map((metric, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color:
                      metric.color === 'blue'
                        ? '#3b82f6'
                        : metric.color === 'green'
                          ? '#10b981'
                          : '#f59e0b',
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginTop: '4px',
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Saatlik Metrikler">
          <ProgressBar label="Hedef" value="8.0 saat" percentage={75} color="#3b82f6" />
          <ProgressBar label="Gerçek" value="6.0 saat" percentage={60} color="#10b981" />
        </Card>
      </div>

      {/* Billing Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {billingMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            icon={metric.icon}
            value={metric.value}
            label={metric.label}
            color={metric.color}
          />
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}
      >
        <Card title="Hızlı İşlemler">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}
          >
            {quickActions.map((action, index) => (
              <QuickActionButton
                key={index}
                icon={action.icon}
                label={action.label}
                color={action.color}
                onClick={() => console.log(`${action.label} tıklandı`)}
              />
            ))}
          </div>
        </Card>

        <Card
          title="Son Aktiviteler"
          action={
            <a href="#" style={{ color: '#3b82f6', fontSize: '14px', textDecoration: 'none' }}>
              Tümünü Gör
            </a>
          }
        >
          {activities.map((activity, index) => (
            <ActivityItemComponent
              key={index}
              dot={activity.dot}
              text={activity.text}
              time={activity.time}
            />
          ))}
        </Card>
      </div>
    </>
  );
};

export default Dashboard;

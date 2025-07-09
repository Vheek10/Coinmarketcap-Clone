interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  className?: string;
  compact?: boolean;
  trend?: 'up' | 'down' | 'neutral';
}

export default function StatCard({
  title,
  value,
  subtext,
  compact = true,
  trend,
  className,
}: StatCardProps) {
  return (
    <div className={`bg-base-200 rounded p-2 h-full flex flex-col ${className}`}>
      <h3 className={`${compact ? 'text-xs' : 'text-sm'} text-gray-500 truncate`}>
        {title}
      </h3>
      <p className={`${
        compact ? 'text-base' : 'text-xl'
      } font-bold my-auto ${
        trend === 'up' ? 'text-green-500' : 
        trend === 'down' ? 'text-red-500' : ''
      }`}>
        {value}
      </p>
      {subtext && (
        <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-500 mt-auto truncate`}>
          {subtext}
          {trend === 'up' && ' ↗'}
          {trend === 'down' && ' ↘'}
        </p>
      )}
    </div>
  );
}
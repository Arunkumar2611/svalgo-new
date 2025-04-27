import React from 'react';
import { Grid } from '@mui/material';
import StatCard from '../StatCard/StatCard';


interface StatItem {
  label: string;
  value: string | number;
  subValue: string | number;
  backgroundColor?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  spacing?: number;
  columns?: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, spacing = 2, columns = 4 }) => {
  return (
    <Grid container spacing={spacing}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={4} lg={columns ? 12 / columns : 3} key={index}>
          <StatCard
            label={stat.label}
            value={stat.value}
            subValue={stat.subValue}
            backgroundColor={stat.backgroundColor}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsGrid;


import React from 'react';
import { Box, Card, Typography, Grid, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

const SettingsSection = ({ title, items }: { title: string, items: string[] }) => (
  <Card sx={{ p: 3, borderRadius: 4, height: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 800 }}>{title}</Typography>
      <Button startIcon={<Add />} size="small" variant="contained" disableElevation sx={{ borderRadius: 2 }}>Добавить</Button>
    </Box>
    <List>
      {items.map((item, i) => (
        <ListItem key={i} divider={i !== items.length - 1}>
          <ListItemText primary={item} />
          <ListItemSecondaryAction>
            <IconButton size="small"><Edit fontSize="small" /></IconButton>
            <IconButton size="small" color="error"><Delete fontSize="small" /></IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </Card>
);

export const Settings: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 800 }}>Настройки анкет</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SettingsSection 
            title="Специальности" 
            items={['Электрик', 'Сантехник', 'Монолитчик', 'Хостес', 'Разработчик']} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SettingsSection 
            title="Города" 
            items={['Бишкек', 'Ош', 'Талас', 'Нарын', 'Джалал-Абад']} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SettingsSection 
            title="Категории вакансий" 
            items={['Маркетинг', 'IT', 'Строительство', 'Услуги']} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

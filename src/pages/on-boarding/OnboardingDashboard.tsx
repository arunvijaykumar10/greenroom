import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';

// Mock data for onboarding status
interface OnboardingStatus {
  id: string;
  name: string;
  email: string;
  payeeType: string;
  status: 'pending' | 'completed' | 'expired' | 'in_progress';
  invitedDate: string;
  completedDate?: string;
  missingItems?: string[];
}

const mockOnboardingData: OnboardingStatus[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    payeeType: 'Employee',
    status: 'completed',
    invitedDate: '2023-10-15',
    completedDate: '2023-10-17'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    payeeType: 'Employee',
    status: 'in_progress',
    invitedDate: '2023-10-18',
    missingItems: ['W-4 Form', 'Direct Deposit Information']
  },
  {
    id: '3',
    name: 'Creative Productions LLC',
    email: 'accounting@creativeprods.com',
    payeeType: 'Vendor/Contractor',
    status: 'pending',
    invitedDate: '2023-10-20'
  },
  {
    id: '4',
    name: 'Michael Davis Productions',
    email: 'michael@davisproductions.com',
    payeeType: 'Loanout',
    status: 'expired',
    invitedDate: '2023-09-30'
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    payeeType: 'Employee',
    status: 'completed',
    invitedDate: '2023-10-10',
    completedDate: '2023-10-12'
  }
];

const OnboardingDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<OnboardingStatus[]>(mockOnboardingData);

  useEffect(() => {
    if (searchTerm) {
      const filtered = mockOnboardingData.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(mockOnboardingData);
    }
  }, [searchTerm]);

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'completed':
        return <Chip icon={<CheckCircleIcon />} label="Completed" color="success" size="small" />;
      case 'in_progress':
        return <Chip icon={<PendingIcon />} label="In Progress" color="primary" size="small" />;
      case 'pending':
        return <Chip icon={<PendingIcon />} label="Pending" color="warning" size="small" />;
      case 'expired':
        return <Chip icon={<ErrorIcon />} label="Expired" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const handleNewOnboarding = () => {
    navigate('/onboarding');
  };

  const handleViewDetails = (id: string) => {
    // Navigate to details page
    console.log(`View details for ${id}`);
  };

  const handleResendInvite = (id: string) => {
    // Resend invitation logic
    console.log(`Resend invite for ${id}`);
  };

  // Count statistics
  const stats = {
    total: mockOnboardingData.length,
    completed: mockOnboardingData.filter(item => item.status === 'completed').length,
    inProgress: mockOnboardingData.filter(item => item.status === 'in_progress').length,
    pending: mockOnboardingData.filter(item => item.status === 'pending').length,
    expired: mockOnboardingData.filter(item => item.status === 'expired').length
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5faff', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="500">
            Onboarding Dashboard
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleNewOnboarding}
            sx={{ borderRadius: 2 }}
          >
            New Onboarding
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Onboardings
                </Typography>
                <Typography variant="h4">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Completed
                </Typography>
                <Typography variant="h4" color="success.main">{stats.completed}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  In Progress
                </Typography>
                <Typography variant="h4" color="primary.main">{stats.inProgress + stats.pending}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Expired
                </Typography>
                <Typography variant="h4" color="error.main">{stats.expired}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filter */}
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name or email"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button startIcon={<FilterListIcon />} sx={{ mr: 1 }}>
                Filter
              </Button>
              <Button variant="outlined">
                Export
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Onboarding List */}
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {filteredData.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <Box>
                      {item.status === 'pending' || item.status === 'expired' ? (
                        <Button 
                          size="small" 
                          variant="outlined" 
                          onClick={() => handleResendInvite(item.id)}
                          sx={{ mr: 1 }}
                        >
                          Resend
                        </Button>
                      ) : null}
                      <Button 
                        size="small" 
                        variant="contained" 
                        onClick={() => handleViewDetails(item.id)}
                      >
                        View
                      </Button>
                      <IconButton edge="end">
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemIcon>
                    <Avatar>{item.name.charAt(0)}</Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <Typography variant="subtitle1" component="span">
                          {item.name}
                        </Typography>
                        <Chip label={item.payeeType} size="small" variant="outlined" />
                        {getStatusChip(item.status)}
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                          {item.email}
                        </Typography>
                        <Typography component="div" variant="body2" sx={{ mt: 0.5 }}>
                          {item.status === 'completed' ? 
                            `Completed on ${item.completedDate}` : 
                            item.status === 'in_progress' ? 
                              `In progress - Missing: ${item.missingItems?.join(', ')}` :
                              `Invited on ${item.invitedDate}`
                          }
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < filteredData.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default OnboardingDashboard;
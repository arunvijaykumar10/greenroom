import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Button, 
  Chip 
} from '@mui/material';
import { 
  Description as DocumentIcon, 
  CloudDownload as DownloadIcon 
} from '@mui/icons-material';
import { Payee } from './payeeTypes';

interface DocumentSectionProps {
  payee: Payee;
}

const DocumentSection: React.FC<DocumentSectionProps> = ({ payee }) => {
  // Mock documents data
  const documents = [
    {
      id: 'doc1',
      name: 'W-4 Form',
      type: 'Tax Form',
      dateUploaded: '2023-01-15',
      status: 'completed'
    },
    {
      id: 'doc2',
      name: 'I-9 Form',
      type: 'Employment Eligibility',
      dateUploaded: '2023-01-15',
      status: 'completed'
    },
    {
      id: 'doc3',
      name: 'Direct Deposit Authorization',
      type: 'Payment',
      dateUploaded: '2023-01-16',
      status: 'completed'
    },
    {
      id: 'doc4',
      name: 'Contract',
      type: 'Legal',
      dateUploaded: '2023-01-14',
      status: 'completed'
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Onboarding Documents
      </Typography>
      
      <List>
        {documents.map((doc) => (
          <ListItem 
            key={doc.id}
            divider
            secondaryAction={
              <Button
                startIcon={<DownloadIcon />}
                size="small"
              >
                Download
              </Button>
            }
          >
            <ListItemIcon>
              <DocumentIcon />
            </ListItemIcon>
            <ListItemText
              primary={doc.name}
              secondary={`${doc.type} • Uploaded on ${doc.dateUploaded}`}
            />
            <Chip 
              label={doc.status === 'completed' ? 'Completed' : 'Pending'} 
              color={doc.status === 'completed' ? 'success' : 'warning'}
              size="small"
              sx={{ mr: 2 }}
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ mt: 3 }}>
        <Button variant="outlined">
          Upload New Document
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentSection;
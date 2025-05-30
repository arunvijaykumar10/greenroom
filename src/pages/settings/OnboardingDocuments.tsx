import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
  Input,
  Stack,
  Paper,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";
import { FileDownload } from "@mui/icons-material";

const boilerplateDocs = [
  "W-4 form",
  "W-9 form",
  "I-9 form",
  "Direct deposit authorization",
  "Anti-harassment policy",
  "Confidentiality agreement",
  "Agent/manager payment authorization",
  "Child Trust/Coogan Trust Payment Authorization",
];

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const OnboardingDocuments = () => {
  const [customDocs, setCustomDocs] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && allowedTypes.includes(file.type)) {
      setCustomDocs((prev) => [...prev, file]);
    } else if (file) {
      alert("Only PDF, Word, and Excel files are allowed");
    }
    e.target.value = "";
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          p: 4,
        }}
      >
        <Typography variant="h5">Onboarding Documents</Typography>
        <Typography variant="subtitle1">
          Manage documents required for onboarding.
        </Typography>
        <Typography variant="body2">
          Download, upload, or remove boilerplate and custom documents.
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 4 }}>
        {/* Boilerplate Docs Section */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Boilerplate Documents
        </Typography>
        <List>
          {boilerplateDocs.map((doc) => (
            <Box key={doc}>
              <ListItem
                secondaryAction={
                  <>
                    <Tooltip title="Download">
                      <IconButton>
                        <FileDownload />
                      </IconButton>
                    </Tooltip>
                  </>
                }
              >
                <ListItemText primary={doc} />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>

        {/* Custom Docs Section */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Custom Documents
        </Typography>
        {customDocs.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No custom documents uploaded.
          </Typography>
        ) : (
          <List>
            {customDocs.map((doc) => (
              <Box key={doc.name}>
                <ListItem
                  secondaryAction={
                    <>
                      <Tooltip title="Download">
                        <IconButton>
                          <FileDownload />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() =>
                            setCustomDocs((prev) =>
                              prev.filter((f) => f.name !== doc.name)
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  }
                >
                  <ListItemText primary={doc.name} />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        )}

        {/* Upload Section */}
        <Box sx={{ mt: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <label htmlFor="upload-doc">
              <Input
                id="upload-doc"
                type="file"
                sx={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadFileIcon />}
                sx={{
                  bgcolor: "#1976d2",
                  color: "#fff",
                  fontWeight: "bold",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "#1565c0" },
                }}
              >
                Upload Document
              </Button>
            </label>
            <Typography variant="body2" color="text.secondary">
              Accepted formats: PDF, Word, Excel
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default OnboardingDocuments;

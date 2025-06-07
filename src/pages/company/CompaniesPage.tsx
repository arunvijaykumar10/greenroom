import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import { useCompany } from "../../contexts/CompanyContext";

const CompanyScreen: React.FC = () => {
  const { selectedCompany, setSelectedCompany, companies, currentRole } =
    useCompany();

  const handleSelectCompany = (companyName: string) => {
    const company = companies.find((c) => c.company === companyName);
    if (company?.isActive) {
      setSelectedCompany(companyName);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3} fontWeight={600}>
        Current Company
      </Typography>

      {selectedCompany && (
        <Card
          sx={{
            mb: 4,
            borderLeft: "4px solid #1976d2",
            backgroundColor: "#f5faff",
            boxShadow: 1,
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              {selectedCompany}
            </Typography>
            <Typography color="text.secondary">Role: {currentRole}</Typography>
          </CardContent>
        </Card>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Switch Company
        </Typography>
        <Button variant="contained" color="primary">
          + Create New Company
        </Button>
      </Box>

      <Grid container spacing={2}>
        {companies.map((company, index) => {
          const isSelected = selectedCompany === company.company;
          const inactive = !company.isActive;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  border: isSelected
                    ? "2px solid #1976d2"
                    : "1px solid #e0e0e0",
                  boxShadow: isSelected ? 3 : 1,
                  opacity: inactive ? 0.6 : 1,
                  transition: "0.3s",
                }}
              >
                <CardActionArea
                  onClick={() => handleSelectCompany(company.company)}
                  disabled={inactive}
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1" fontWeight={500}>
                        {company.company}
                      </Typography>
                      <Chip
                        label={company.isActive ? "Active" : "Inactive"}
                        color={company.isActive ? "success" : "error"}
                        size="small"
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mt={1.5}>
                      Role: {company.role}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CompanyScreen;

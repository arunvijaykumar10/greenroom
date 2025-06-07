import React, { createContext, useContext, useMemo, useState } from "react";

interface CompanyContextType {
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
  setCompanies: React.Dispatch<
    React.SetStateAction<
      {
        company: string;
        role: string;
        isActive: boolean;
      }[]
    >
  >;

  companies: {
    company: string;
    role: string;
    isActive: boolean;
  }[];
  currentRole: string;
}

const userCompaniesAndRoles = [
  { company: "TechNova Inc.", role: "Admin", isActive: true },
  { company: "BrightPath LLC", role: "Employee", isActive: true },
  { company: "GreenHarvest Co.", role: "Admin", isActive: false },
  {
    company: "UrbanEdge Designs",
    role: "Employee",
    isActive: false,
  },
  { company: "GlobalTech Solutions", role: "Admin", isActive: true },
  {
    company: "NextGen Innovations",
    role: "Employee",
    isActive: true,
  },
  { company: "EcoWave Enterprises", role: "Admin", isActive: false },
];

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCompany, setSelectedCompany] = useState("TechNova Inc.");
  const [companies, setCompanies] = useState(userCompaniesAndRoles);

  const currentRole = useMemo(
    () =>
      companies.find((user) => user.company === selectedCompany)?.role || "",
    [selectedCompany]
  );

  return (
    <CompanyContext.Provider
      value={{
        selectedCompany,
        setSelectedCompany,
        setCompanies,
        companies,
        currentRole,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

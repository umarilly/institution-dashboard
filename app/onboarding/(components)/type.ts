export type businessFundFormType = {
  businessName: string;
  domicileIn: string;
  dateEstablished: Date;
  typeOfIndustry: string;
};
export type financialInformationFormType = {
  totalAUM: string;
  estimatedAUM: string;
  estimatedInvestors: string;
};
export type fundManagerFormType = {
  ownerName: string;
  position: string;
  linkedInLink: string;
};
export type fundDocumentsFormType = {
  memorandum: File | null;
  factsheet: File | null;
  license: File | null;
};
export type baseCurrencyFormType = {
  baseCurrency: string;
  fundInceptionDate: Date;
  fiscalYearEnd: any;
  administrator: string;
};
export type OnBoardingStoreType = {
  businessFundForm: businessFundFormType;
  financialInformationForm: financialInformationFormType;
  fundManagerForm: fundManagerFormType;
  fundDocumentsForm: fundDocumentsFormType;
  baseCurrencyForm: baseCurrencyFormType;
  setBusinessFundForm: (form: businessFundFormType) => void;
  setFinancialInformationForm: (form: financialInformationFormType) => void;
  setFundManagerForm: (form: fundManagerFormType) => void;
  setFundDocumentsForm: (form: fundDocumentsFormType) => void;
  setBaseCurrencyForm: (form: baseCurrencyFormType) => void;
};

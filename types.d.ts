export type IStatus = "ATIVA" | "INATIVA";

export interface IActividate {
  text: string;
  code: string;
}

export interface ICNPJ {
  status: "OK" | "ERROR";
  situacao: IStatus;
  telefone: string;
  atividade_principal: IActividate[];
  capital_social: string | number;
  fantasia: string;
  nome: string;
  ultima_atualizacao: Date | string;
}

export type MainStackParamList = {
  Home: undefined;
  Details: { title: string; cnpj: ICNPJ };
};

import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "../types";
import { ScrollView, StyleSheet, View } from "react-native";
import { List, Paragraph } from "react-native-paper";
import InfoItem from "../components/InfoItem";
import {
  capitalize,
  parseDate,
  splitPhoneNumber,
  toBrazilianCurrency,
} from "../util/Helper";

type DetailsProps = StackScreenProps<MainStackParamList, "Details">;

const DetailsScreen: React.FC<DetailsProps> = ({ route }) => {
  const {
    situacao,
    telefone,
    capital_social,
    fantasia,
    nome,
    ultima_atualizacao,
    atividade_principal,
  } = route.params.cnpj;

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <InfoItem
          title="Status"
          description={situacao === "ATIVA" ? "Active" : "Deactive"}
          icon={
            situacao === "ATIVA" ? "checkbox-marked-circle" : "close-circle"
          }
        />

        <InfoItem
          title="Phone Number"
          description={splitPhoneNumber(telefone).toString() || "Any"}
          icon="phone"
        />

        <InfoItem
          title="Initial Income"
          description={toBrazilianCurrency(capital_social) || "Any"}
          icon="currency-usd"
        />
        <InfoItem
          title="Company Name"
          description={capitalize(fantasia) || "Any"}
          icon="office-building"
        />
        <InfoItem
          title="Company Legal Name"
          description={capitalize(nome) || "Any"}
          icon="domain"
        />
        <InfoItem
          title="Date of last update"
          description={parseDate(ultima_atualizacao).toString() || "Any"}
          icon="calendar-range"
        />

        {atividade_principal?.length && (
          <List.Section
            title={`Number of Activities: #${atividade_principal.length}`}
            titleStyle={{ fontWeight: "bold" }}
          >
            <List.AccordionGroup>
              {atividade_principal.map((item, index) => (
                <List.Accordion
                  key={index}
                  theme={{ colors: { primary: "#206db0" } }}
                  id={item.code}
                  title={item.code}
                  left={(props) => <List.Icon {...props} icon="ticket" />}
                >
                  <Paragraph>{item.text}</Paragraph>
                </List.Accordion>
              ))}
            </List.AccordionGroup>
          </List.Section>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    margin: 5,
    padding: 10,
  },
});

export default DetailsScreen;

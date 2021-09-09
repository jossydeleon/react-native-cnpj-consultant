import * as React from "react";
import { List } from "react-native-paper";

interface InfoItemProps {
  title: string;
  icon: string;
  description: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, icon, description }) => {
  return (
    <List.Item
      title={title}
      description={description}
      left={(props) => <List.Icon {...props} icon={icon} color="#206db0" />}
      titleStyle={{ fontWeight: "bold" }}
    />
  );
};

export default InfoItem;

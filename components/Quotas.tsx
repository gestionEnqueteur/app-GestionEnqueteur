import React from "react";
import { Chip } from "react-native-paper";

type PropsQuotas = {
  value: number;
};

export default function Quotas({ value }: Readonly<PropsQuotas>) {
  return (
    <Chip mode="outlined" icon="bullseye-arrow">
      {value}
    </Chip>
  );
}

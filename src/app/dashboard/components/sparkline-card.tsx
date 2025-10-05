import { Card, Skeleton, Stat } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SparklineCardProps {
  isLoading: boolean;
  title: string;
  total: number;
  color: string;
  children: ReactNode;
  [key: string]: unknown;
}

export default function SparklineCard({ isLoading, title, total, color, children, ...rest }: SparklineCardProps) {
  if (isLoading) {
    return <Skeleton height="125px" flexGrow={1}/>;
  }

  return (
    <Card.Root variant="subtle" maxW="sm" size="sm" overflow="hidden" backgroundColor={color} {...rest}>
      <Card.Body>
        <Stat.Root gap={0}>
          <Stat.ValueText>{total}</Stat.ValueText>
          <Stat.Label color="black">{title}</Stat.Label>
        </Stat.Root>
      </Card.Body>
      {children}
    </Card.Root>
  );
}

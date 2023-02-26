import { LogoWithTitle } from "@/components/LogoWithTitle";

export const FullScreenLoading: React.FC = () => {
  return (
    <div un-h="screen" un-flex="~" un-justify="center" un-items="center" un-duration="1000" un-animate="pulse">
      <LogoWithTitle />
    </div>
  );
};

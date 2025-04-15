import Home_V1 from "./landing";
import MetaData from "@/components/common/MetaData";
import Wrapper from "./layout-wrapper/wrapper";

const metaInformation = {
  title: "Home || Flapabay- Apartment Rental, Experiences and More!",
};

export default function Mainpage() {
  return (
    <Wrapper>
      <MetaData meta={metaInformation} />
      <Home_V1 />
     
    </Wrapper>
  );
}

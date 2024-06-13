import { render, RenderOptions, RenderResult } from '@testing-library/react-native'
import { RecoilRoot } from "recoil";
import { PaperProvider } from "react-native-paper";



export const AllTheProviders = ({ children }: { children: React.ReactNode}): React.JSX.Element => {
  return (
    <RecoilRoot>
      <PaperProvider>
        {children}
      </PaperProvider>
    </RecoilRoot>
  );
  
}


// Custom render fonction
const customRender = (ui: React.ReactElement<any>, options?: RenderOptions): RenderResult => {
  return render(ui, {wrapper: AllTheProviders, ...options})
};


export * from '@testing-library/react-native';
export { customRender as render }
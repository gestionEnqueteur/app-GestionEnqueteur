import axios from "axios";
import { RecoilRoot } from "recoil";
import useApi from "../../hook/useApi";
import { configurationState, jwtState } from "../../store/storeAtom";
import { renderHook } from "../test-utils";

describe("useApi.test.tsx", () => {
  // RecoitRool Provider for testing environnement
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RecoilRoot
      initializeState={(MutableSnapshot) => {
        MutableSnapshot.set(jwtState, "MyJWT");
        MutableSnapshot.set(configurationState, {
          urlApi: "http://HelloWorld.com",
          user: "Admin",
        });
      }}
    >
      {children}
    </RecoilRoot>
  );

  test("useApi doit retourner une instance d'axios configurée avec un baseURL et un jwt", () => {
    const { result } = renderHook(() => useApi(), { wrapper: wrapper });
    expect(typeof result.current).toBe(typeof axios.create({}));
    expect(result.current.defaults.baseURL).toBe("http://HelloWorld.com");
    expect(result.current.defaults.headers.Authorization).toBe("Bearer MyJWT");
  });
});

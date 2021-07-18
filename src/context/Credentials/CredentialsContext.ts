import { createContext, Dispatch, SetStateAction } from "react";
import { Credentials } from "../../models";

const CredentialsContext = createContext<[Credentials[], Dispatch<SetStateAction<Credentials[]>>]>([
    [],
    (value: Credentials[] | ((prevState: Credentials[]) => Credentials[])) => {},
]);

export default CredentialsContext;

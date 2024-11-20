export type user = {

    UID: string | number, 

    firstName: string, 
    lastName: string, 

    phone_primary: string | number, 
    phone_secondary?: string | number,
    email: string, 

    ssn: string | number, 

    accounts?: account[] | null

};

export type employee = {
    
    info: user, 
    isIadmin: boolean

};

export type account = {
    
    ID: string | number, 
    name: string, 
    balance: number | string

};
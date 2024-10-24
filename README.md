>> ===================================================================================================================
#   Homepage Basic Info

    - Page will function both as a user homepage and title/starting page for all users

    - Account section content switches between list of registered user accounts and account type descriptions
        - This is done through an array of accounts located in HomePage.tsx
        - When array is empty (for new/logged-in users), account type descriptions are displayed
        - When array is not empty (registered users with existing accounts), the accounts are displayed

#   [Note to Backend] Objects in the account array require certain data to be passed:

        ```js
        type account = {id: number, name: string, balance: number, link: string};
        

        Account data reqs:

        id:         // Specific account id
        name:       // Name of account
        balance:    // Numeric value representing balance stored in account
        link:       // String holding link to the account's separate page
        ```

>> ====================================================================================================================
#   To-do (Prioritize High to Low)

    - Link to Login/Logout & Registration
    - Replace temp links with actual page links
    - Figure out how to open page w/o running terminal command
    - CSS touchups
    - Fill in placeholder info
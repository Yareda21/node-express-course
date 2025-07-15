# Deleting data 


## Implement Delete http method 
### Soft Delete vs Hard Delete (Short Explanation)

-   **Soft Delete:**

    -   The record is not actually removed from the database, but marked as deleted (e.g., with a `deleted` flag or `deletedAt` timestamp).
    -   Data can be restored if needed.
    -   Useful for audit trails and undo functionality.

-   **Hard Delete:**
    -   The record is permanently removed from the database.
    -   Data cannot be recovered after deletion.
    -   Useful for permanent cleanup.

| Type        | Data Remains? | Can Restore? | Use Case                        |
| ----------- | :-----------: | :----------: | ------------------------------- |
| Soft Delete |      Yes      |     Yes      | Audit, compliance, undo support |
| Hard Delete |      No       |      No      | Permanent removal, cleanup      |

import React, { useState, useEffect, useContext } from 'react'
import { AuthorizationContext } from '../../AuthorizationContext'
import { Alert } from 'react-bootstrap'

function TransactionsList() {
    const [transactions, setTransactions] = useState([]);
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const successMessage = store.successMessage;

    useEffect(() => {
        showTransactions();
    }, [])

    if (successMessage !== '') {
        setTimeout(() => setStore({ ...store, successMessage: '' }), 2000)
    }
    const showTransactions = () => {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/transactions", requestOptions)
            .then(response => response.json())
            .then(result => setTransactions(result))
            .catch(error => console.log('error', error));
    }

    console.log(transactions)
    return (
        <div className="container">
            {successMessage &&
                <Alert style={{ position: 'fixed', top: '0' }} variant='success'>{successMessage}</Alert>}
            <h3 className="component-header">Transactions</h3>
            <div className="">
                <table style={{ backgroundColor: 'white', textAlign: 'center' }} className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Source Account</th>
                            <th>Target Account</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            transactions.map(transaction =>
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.transactionDate}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.transactionType}</td>
                                    <td>{transaction.sourceAccount !== null ? transaction.sourceAccount.accountNumber : ''}</td>
                                    <td>{transaction.targetAccount !== null ? transaction.targetAccount.accountNumber : ''}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TransactionsList

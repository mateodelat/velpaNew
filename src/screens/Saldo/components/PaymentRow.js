import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { formatMoney, moradoOscuro } from '../../../../assets/constants'

const PaymentRow = ({ title, description, amount, status, style }) => {
    function calculateColor() {
        return amount.content === 0 ? "black" : amount.content > 0 ? "green" : "red"
    }



    return (
        <View style={{
            flexDirection: 'row',
            padding: 10,
            paddingLeft: 45,
            flex: 1,
            ...style
        }}>

            <View style={{ justifyContent: 'center', flex: 1, }}>
                {title && <Text style={{
                    color: '#333',
                    fontWeight: 'bold',
                }}>{title}</Text>}
                <Text style={{
                    fontSize: 12,
                }}>{description}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'flex-end', }}>
                <Text style={{
                    textAlignVertical: 'center',

                    fontWeight: 'bold',
                    color: amount.color ? amount.color : calculateColor(),
                }}>
                    {formatMoney(amount.content)}
                </Text>

                {status?.content && <Text style={{
                    // marginTop: 2,
                    color: status.color ? status.color : "orange",
                }}>
                    {status.content}
                </Text>}

            </View>
        </View>)
}

export default PaymentRow

const styles = StyleSheet.create({


})
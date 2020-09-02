import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'

interface Props {
  dataamount: number
  legaladvice: boolean
}

const Widget: StorefrontFunctionComponent<Props> = ({
  dataamount,
  legaladvice = true
}) => {

  const { selectedItem } = useContext(ProductContext)
  const commercialOffer = selectedItem?.sellers[0]?.commertialOffer

  if (!commercialOffer || commercialOffer?.AvailableQuantity <= 0) {
    return null
  }

  const { taxPercentage } = commercialOffer

  dataamount = commercialOffer.Price + commercialOffer.Price * taxPercentage

  return (
    <div
      data-aplazame-widget-instalments=""
      data-view="product"
      data-amount={dataamount * 100}
      data-currency="EUR"
      data-option-legal-advice={legaladvice}
    ></div>
  )
}

Widget.schema = {
  title: 'admin/editor.aplazame.widget',
  type: 'object',
  properties: {
    legaladvice: {
      title: 'admin/editor.aplazame.legal-advice',
      type: 'boolean',
      default: true,
    },
  },
}

export default Widget

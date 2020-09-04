import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { useRuntime } from 'vtex.render-runtime'

interface Props {
  amount: number
  qty: string
  articleId: string
  currency: string
  legalAdvice: boolean
}

const Widget: StorefrontFunctionComponent<Props> = ({
  amount,
  qty = 'div.vtex-product-quantity-1-x-quantitySelectorContainer input',
  articleId,
  currency,
  legalAdvice = true
}) => {

  const { culture } = useRuntime()
  const { selectedItem } = useContext(ProductContext)
  const commercialOffer = selectedItem?.sellers[0]?.commertialOffer

  if (!commercialOffer || commercialOffer?.AvailableQuantity <= 0) {
    return null
  }

  const { taxPercentage } = commercialOffer

  amount = commercialOffer.Price + commercialOffer.Price * taxPercentage
  articleId = selectedItem?.itemId
  currency = culture.currency

  return (
    <div
      data-aplazame-widget-instalments=''
      data-view='product'
      data-amount={amount * 100}
      data-qty={qty}
      data-currency={currency}
      data-article-id={articleId}
      data-option-legal-advice={legalAdvice}
    ></div>
  )
}

Widget.schema = {
  title: 'admin/editor.aplazame.widget',
  type: 'object',
  properties: {
    qty: {
      title: 'admin/editor.aplazame.qty',
      type: 'string',
      default: 'div.vtex-product-quantity-1-x-quantitySelectorContainer input',
    },
    legalAdvice: {
      title: 'admin/editor.aplazame.legal-advice',
      type: 'boolean',
      default: true,
    },
  },
}

export default Widget

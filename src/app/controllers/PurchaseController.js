const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    try {
      await Mail.sendMail({
        from: '"Samuel Brehm" <samuelbrehm@gmail.com>',
        to: purchaseAd.author.email,
        subject: `Solicitação de compra: ${purchaseAd.title}`,
        template: 'purchase',
        context: { user, content, ad: purchaseAd }
      })
      return res.send()
    } catch (err) {
      return res.json({ error: err.message })
    }
  }
}

module.exports = new PurchaseController()

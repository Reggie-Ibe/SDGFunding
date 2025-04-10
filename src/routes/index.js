const { Router } = require('express');
const User = require('../models/User');
const Project = require('../models/Project');
const Investment = require('../models/Investment');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API Root',
    endpoints: {
      admin: '/admin',
      investor: '/investor',
      innovator: '/innovator'
    }
  });
});

router.post('/investor/invest', async (req, res) => {
  try {
    const { projectId, investorId, amount } = req.body;
    
    const project = await Project.findOneBy({ id: projectId });
    const investor = await User.findOneBy({ id: investorId });
    
    if (!project || !investor) {
      return res.status(404).json({ message: "Not found" });
    }

    const investment = Investment.create({
      amount,
      date: new Date(),
      investor,
      project
    });

    await investment.save();
    await Project.update(projectId, {
      fundedAmount: () => `"fundedAmount" + ${amount}`
    });
    
    return res.json(investment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error processing investment" });
  }
});

module.exports = router;
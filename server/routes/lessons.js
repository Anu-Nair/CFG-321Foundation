const router = require('express').Router();
let Lesson = require('../models/lesson.model');

router.route('/').get((req, res) => {
    Lesson.find()
        .then(lessons => res.json({'lessons': lessons}))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    

    console.log(req.body);

    const newLesson = new Lesson({
        ...req.body
    });

    newLesson.save()
        .then((result) => {
            res.json('Lesson added!')
            console.log(result);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Error: ' + err)
        });
});

router.route('/:id').get((req, res) => {
    Lesson.findById(req.params.id)
        .then(lesson => res.json(lesson))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/getdetailedlesson/:id",(req,response)=>{
    console.log(req.params.id)
    Lesson.findOne({timestamp: req.params.id},(err,result)=>{
        if(err){
            response.status(400).json({message: 'Error'});

        }
        else{
            response.status(200).json({message: 'ok', data: result});
        }
    })
})

router.put("/increamentviewcount",(req,resp)=>{
    Lesson.updateOne({timestamp: req.body.timestamp},req.body, (err, result)=>{
        if(err){
            resp.status(400).json({'message': 'error occurred'});
        }
        else{
            
            if(result['n']>0)
                resp.status(200).json({'message':'ok'});
            else
                resp.status(400).json({'message':'view not updated'})
        }
    })
})
// router.route('/:id').delete((req, res) => {
//     Exercise.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Exercise deleted.'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').put((req, res) => {
//     const username = req.body.username;
//     const description = req.body.description;
//     const duration = Number(req.body.duration);
//     const date = Date.parse(req.body.date);

//     Exercise.findByIdAndUpdate(
//         req.params.id,
//         {
//             username: username,
//             description: description,
//             duration: duration,
//             date: date
//         }
//         )
//         .then(() => res.json('Exercise updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
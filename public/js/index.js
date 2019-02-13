import {addPlannedTask, removePlannedTask} from './modules/admin.js';

document.querySelectorAll('button.planning-task').forEach(btn => {
    btn.addEventListener('click', async event => {
        const {taskid, memberid, active} = event.target.dataset;

        if (active === 'false') {
            await addPlannedTask(parseInt(taskid, 10), parseInt(memberid,10));
            event.target.classList.add('planning-task-active');
        } else {
            await removePlannedTask(parseInt(taskid, 10), parseInt(memberid,10));
            event.target.classList.remove('planning-task-active');
        }
    }, false);
});

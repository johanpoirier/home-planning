export function addPlannedTask(taskId, memberId) {
    return fetch('/admin/plannedTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taskId,
            memberId,
            date: null
        })
    });
}

export function removePlannedTask(taskId, memberId) {
    return fetch('/admin/plannedTask', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taskId,
            memberId,
            date: null
        })
    });
}

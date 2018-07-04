var getGroupData = function getGroupData(group) {
	if (group === 'a')
		return {
			name: 'A',
			num_tasks: 2
		};
	else return {
		name: 'B',
		num_tasks: 3
	}
}

var putGroupContent = function putGroupContent(group) {
	let group_data = getGroupData(group);

	$('#group').val(group_data.name);
	$('.p__span--namegroup').html(group_data.name);
	$('.p__span--numtarefas').html(group_data.num_tasks);
}

var setParticipant = function setParticipant(rg, group) {
	let participants = []
	, new_participant;

	new_participant = createNewParticipant(rg, group);
    localStorage.setItem('current-participant', JSON.stringify(new_participant));
}

var addItemsToParticipant = function addItemsToParticipant(participant) {
    localStorage.setItem('current-participant', JSON.stringify(participant));
}

var getParticipant = function getParticipant() {
	return JSON.parse(localStorage.getItem('current-participant'));
}

var createNewParticipant = function createNewParticipant(rg, group) {
	return {
    	'rg': rg,
    	'group': group,
    	'part-0': {
    		'task-1': {
    			'is': '',
    			'im': '',
    			'sc': ''
    		}
    	}, 
    	'part-1': {
    		'task-1': {
    			'is': '',
    			'im': '',
    			'sc': ''
    		},
    		'task-2': {
    			'is': '',
    			'im': '',
    			'sc': ''
    		}
    	},    	
    	'part-2': {
    		'task-1': {
    			'is': '',
    			'im': '',
    			'sc': ''
    		},
    		'task-2': {
    			'is': '',
    			'im': '',
    			'sc': ''
    		}
    	},
    	'time': new Date()	
    };
}

var checkBtnDisabled = function checkBtnDisabled(el, btn) {
	if ($(el).val().trim().length > 0) 
		$('.button-wrapper__button--' + btn).prop('disabled', false);
	else
		$('.button-wrapper__button--' + btn).prop('disabled', true);
}

var submitSAMValues = function submitSAMValues(part, task) {
	let participant = getParticipant();
	let stringContent = 'p' + part + '-t' + task;

	participant['part-' + part]['task-' + task]['is'] = $('.input-group__range--is-' + stringContent).val();
	participant['part-' + part]['task-' + task]['im'] = $('.input-group__range--im-' + stringContent).val();
	participant['part-' + part]['task-' + task]['sc'] = $('.input-group__range--sc-' + stringContent).val(); 

	addItemsToParticipant(participant);
}

var addFinishedParticipant = function addFinishedParticipant() {
	let participant = getParticipant();
    localStorage.setItem(participant.rg, JSON.stringify(participant));

}

$(function() {
	$('.button-wrapper__button--group').on('click', function() {
		$('.main__section--btngroup').addClass('main__section--hidden');
		putGroupContent($(this).data('group'));

		$('.main__section--grupo').removeClass('main__section--hidden');
	});

	$('#rg').on('keydown', function() {
		checkBtnDisabled('#rg', 'starttask');
	});

	$('.input-group__range').on('change', function() {
		$('.input-group__p--range-value-' + $(this).data('dimension')).html($(this).val());
	});

	$('.button-wrapper__button--starttask').on('click', function() {
		setParticipant($('#rg').val().trim(), $('#group').val());
		let participant = getParticipant();
		$('.main__section--grupo').addClass('main__section--hidden');
		if (participant.group === 'A')
			$('.main__section--part1-task1').removeClass('main__section--hidden');
		else
			$('.main__section--part0').removeClass('main__section--hidden');
	});

	$('.button-wrapper__button--nexttask').on('click', function() {
		submitSAMValues($(this).data('part'), $(this).data('task'));
		if ($(this).data('part') === 0) {
			$('.main__section--part0').addClass('main__section--hidden');
			$('.main__section--part1-task1').removeClass('main__section--hidden');
		} else if (($(this).data('task') === 1) && ($(this).data('part') === 1)) {
			$('.main__section--part1-task1').addClass('main__section--hidden');
			$('.main__section--part1-task2').removeClass('main__section--hidden');
		} else if (($(this).data('task') === 2) && ($(this).data('part') === 1)) {
			$('.main__section--part1-task2').addClass('main__section--hidden');
			$('.main__section--part2-task1').removeClass('main__section--hidden');
		} else if (($(this).data('task') === 1) && ($(this).data('part') === 2)) {
			$('.main__section--part2-task1').addClass('main__section--hidden');
			$('.main__section--part2-task2').removeClass('main__section--hidden');
		} else if (($(this).data('task') === 2) && ($(this).data('part') === 2)) {
			$('.main__section--part2-task2').addClass('main__section--hidden');
			$('.main__section--finish').removeClass('main__section--hidden');
			addFinishedParticipant();
		}
		window.scrollTo(0, 0);
	});



});
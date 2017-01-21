from django.shortcuts import render, redirect, reverse
from django.http import HttpResponse
import copy
import random
from models import *
from django.utils.safestring import mark_safe
from django.forms.models import model_to_dict
import json
import string

TRIAL_NUMBER = 5

# Create your views here.
def lander(request):
    return render(request, 'lander.html')

def session(request):
    if request.method != "POST" or not 'user_id' in request.POST.keys():
        if "user" in request.session.keys():
            return redirect(request.session['user'])
        else:
            return redirect("/")
    request.session['user_id'] = request.POST['user_id']
    try:
        sub = Subject.objects.get(subject_id=request.POST['user_id'])
        return redirect(sub)
    except:
        return HttpResponse("There is no user with the ID you entered.<br>Please ensure your admin has created your Subject ID.")

def subject(request):
    try:
        sub = Subject.objects.get(subject_id=request.session['user_id'])
    except:
        return HttpResponse("I couldn't find the subject you're looking for.<br>Please return to the landing page and enter an ID.")
    response_list = FullResponseSet.objects.filter(subject=sub)
    return render(request, 'subject.html', {'sub': sub, 'response_list':response_list})

def divergent(request, sub, last):
    stimuli = list(Stimulus.objects.filter(task=Stimulus.DIVERGENT))
    used = list(sub.used_divergent_stimuli.all())
    if len(used) > len(stimuli) - TRIAL_NUMBER:
        sub.used_divergent_stimuli.clear()
        used = []
    stimuli_to_use = []
    random.shuffle(stimuli)
    for i in range(len(stimuli)):
        if stimuli[i] not in used:
            stimuli_to_use.append(model_to_dict(stimuli[i]))
            sub.used_divergent_stimuli.add(stimuli[i])
            if len(stimuli_to_use) >= TRIAL_NUMBER:
                break
    random.shuffle(stimuli_to_use)
    sub.save()

    return render(request, "trial.html", {"trial_type":"divergent", "stimuli_to_use":mark_safe(json.dumps(stimuli_to_use)), "last_trial":last})

def report_divergent(request):
    if request.method != "POST" or not "response_set" in request.session.keys():
        return HttpResponse("Oops! You got to this link by accident. Please return to the home page.")
    json_object = json.loads(request.body)
    for response in json_object:
        try:
            block = DivergentResponseSet(response_set=request.session['response_set'])
            block.save()
            divergent_response = DivergentResponse(
                divergent_set = block,
                response_1 = response['response_1'],
                time_1 = response['time_1'],
                response_2 = response['response_2'],
                time_2 = response['time_2'],
                response_3 = response['response_3'],
                time_3 = response['time_3'],
                response_4 = response['response_4'],
                time_4 = response['time_4'],
                response_5 = response['response_5'],
                time_5 = response['time_5'],
                total_time = response['total_time'],
                stimulus = Stimulus.objects.get(id=response['stimulus'])
            )
            divergent_response.save()
        except:
            pass
    return HttpResponse("You shouldn't see this message")

def convergent(request, sub, last):
    stimuli = list(Stimulus.objects.filter(task=Stimulus.CONVERGENT))
    used = list(sub.used_convergent_stimuli.all())
    if len(used) > len(stimuli) - TRIAL_NUMBER:
        sub.used_convergent_stimuli.clear()
        used = []
    stimuli_to_use = []
    random.shuffle(stimuli)
    for i in range(len(stimuli)):
        if stimuli[i] not in used:
            stimuli_to_use.append(model_to_dict(stimuli[i]))
            sub.used_convergent_stimuli.add(stimuli[i])
            if len(stimuli_to_use) >= TRIAL_NUMBER:
                break
    random.shuffle(stimuli_to_use)
    sub.save()

    return render(request, "trial.html", {"trial_type":"convergent", "stimuli_to_use":mark_safe(json.dumps(stimuli_to_use)), "last_trial":last})

def report_convergent(request):
    if request.method != "POST" or not "response_set" in request.session.keys():
        return HttpResponse("Oops! You got to this link by accident. Please return to the home page.")
    json_object = json.loads(request.body)
    for response in json_object:
        try:
            block = ConvergentResponseSet(response_set=request.session['response_set'])
            block.save()
            convergent_response = ConvergentResponse(
                convergent_set = block,
                response_1 = response['response_1'],
                time_1 = response['time_1'],
                response_2 = response['response_2'],
                time_2 = response['time_2'],
                response_3 = response['response_3'],
                time_3 = response['time_3'],
                response_4 = response['response_4'],
                time_4 = response['time_4'],
                response_5 = response['response_5'],
                time_5 = response['time_5'],
                total_time = response['total_time'],
                stimulus = Stimulus.objects.get(id=response['stimulus'])
            )
            convergent_response.save()
        except:
            pass
    return HttpResponse("You shouldn't see this message")

def recombination(request, sub, last):
    used = [stim.stim for stim in sub.used_recombination_stimuli.all()]
    stimuli_to_use = []
    while len(stimuli_to_use) < 5:
        next_stim = ''.join(random.choice(string.ascii_uppercase + string.digits) for i in range(5))
        if not (next_stim in used):
            try:
                temp = Stimulus.objects.get(task=Stimulus.RECOMBINATION, stim=next_stim)
            except:
                temp = Stimulus(task=Stimulus.RECOMBINATION, stim=next_stim)
                temp.save()
            stimuli_to_use.append(model_to_dict(temp))
            sub.used_recombination_stimuli.add(temp)
    sub.save()
    return render(request, "trial.html", {"trial_type":"recombination", "stimuli_to_use":mark_safe(json.dumps(stimuli_to_use)), "last_trial":last})

def report_recombination(request):
    if request.method != "POST" or not "response_set" in request.session.keys():
        return HttpResponse("Oops! You got to this link by accident. Please return to the home page.")
    json_object = json.loads(request.body)
    for response in json_object:
        try:
            block = RecombinationResponseSet(response_set=request.session['response_set'])
            block.save()
            recombination_response = RecombinationResponse(
                recombination_set = block,
                response_1 = response['response_1'],
                time_1 = response['time_1'],
                response_2 = response['response_2'],
                time_2 = response['time_2'],
                response_3 = response['response_3'],
                time_3 = response['time_3'],
                response_4 = response['response_4'],
                time_4 = response['time_4'],
                response_5 = response['response_5'],
                time_5 = response['time_5'],
                total_time = response['total_time'],
                stimulus = Stimulus.objects.get(id=response['stimulus'])
            )
            recombination_response.save()
        except:
            pass
    return HttpResponse("You shouldn't see this message")

def block_design(request, sub, last):
    used = [stim.stim for stim in sub.used_block_design_stimuli.all()]
    stimuli_to_use = []
    while len(stimuli_to_use) < 5:
        temp_stim_str = []
        temp_stim = random.sample(range(19), 5)
        for num in temp_stim:
            temp_stim_str.append(str(num))
        next_stim = ','.join(temp_stim_str)
        if not (next_stim in used):
            try:
                temp = Stimulus.objects.get(task=Stimulus.BLOCK_DESIGN, stim=next_stim)
            except:
                temp = Stimulus(task=Stimulus.BLOCK_DESIGN, stim=next_stim)
                temp.save()
            stimuli_to_use.append(model_to_dict(temp))
            sub.used_block_design_stimuli.add(temp)
    sub.save()
    return render(request, "trial.html", {"trial_type":"block design", "stimuli_to_use":mark_safe(json.dumps(stimuli_to_use)), "last_trial":last})

def report_block(request):
    if request.method != "POST" or not "response_set" in request.session.keys():
        return HttpResponse("Oops! You got to this link by accident. Please return to the home page.")
    json_object = json.loads(request.body)
    for response in json_object:
        try:
            block = BlockDesignResponseSet(response_set=request.session['response_set'])
            block.save()
            block_design_response = BlockDesignResponse(
                block_design_set = block,
                response_1_unique = response['response_1_unique'],
                time_1 = response['time_1'],
                response_2_unique = response['response_2_unique'],
                time_2 = response['time_2'],
                response_3_unique = response['response_3_unique'],
                time_3 = response['time_3'],
                response_4_unique = response['response_4_unique'],
                time_4 = response['time_4'],
                response_5_unique = response['response_5_unique'],
                time_5 = response['time_5'],
                total_time = response['total_time'],
                stimulus = Stimulus.objects.get(id=response['stimulus'])
            )
            block_design_response.save()
        except:
            pass
    return HttpResponse("You shouldn't see this message")

TRIALS = ['divergent', 'convergent', 'recombination', 'block_design']

def trial(request):
    try:
        sub = Subject.objects.get(subject_id=request.session['user_id'])
    except:
        return HttpResponse("Please return to the landing page and enter an ID.")
    if not 'remaining_trials' in request.session.keys():
        response_set = FullResponseSet(subject=sub)
        response_set.save()
        trials = copy.copy(TRIALS)
        random.shuffle(trials)
        request.session['remaining_trials'] = trials
        request.session['response_set'] = response_set.pk
    elif len(request.session['remaining_trials']) == 0:
        request.session.pop('remaining_trials')
        response_set = FullResponseSet(subject=sub)
        response_set.save()
        trials = copy.copy(TRIALS)
        random.shuffle(trials)
        request.session['remaining_trials'] = trials
        request.session['response_set'] = response_set.pk

    next_phase = request.session['remaining_trials'].pop()
    if len(request.session['remaining_trials']) == 0:
        last = True;
    else:
        last = False;
    if next_phase == 'divergent':
        return divergent(request, sub, last)
    elif next_phase == 'convergent':
        return convergent(request, sub, last)
    elif next_phase == 'recombination':
        return recombination(request, sub, last)
    else:
        return block_design(request, sub, last)

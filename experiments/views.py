from django.shortcuts import render, redirect
from django.http import HttpResponse
import copy
import random
from models import *
from django.utils.safestring import mark_safe
import json

TRIALS = [divergent, convergent, recombination, block_design]
TRIAL_NUMBER = 5

# Create your views here.
def lander(request):
    try:
        latest_subject = Subject.objects.latest("id")
        return render(request, 'lander.html', {"next_user_id": latest_subject.id})
    except:
        return render(request, 'lander.html', {"next_user_id": 1})

def session(request):
    if request.method != "POST" or not 'user_id' in request.POST.keys():
        if "user" in request.session.keys():
            return redirect(request.session['user'])
        else:
            return redirect("/")]
    request.session['user_id'] = request.POST['user_id']
    try:
        sub = Subject.objects.get(id=request.POST['user'])
        return redirect(sub)
    except:
        sub = Subject()
        sub.save()
        return redirect(sub)

def subject(request):
    try:
        sub = Subject.objects.get(id=request.session['user_id'])
        return render(request, 'subject.html', {'sub': sub})
    except:
        return HttpResponse("I couldn't find the subject you're looking for.<br>Please return to the landing page and enter an ID.")

def trial(request):
    try:
        sub = Subject.objects.get(id=request.session['user_id'])
    except:
        return HttpResponse("Please return to the landing page and enter an ID.")
    response_set = FullResponseSet(subject=sub)
    response_set.save()
    trials = copy.copy(TRIALS)
    random.shuffle(trials)
    return trials[0](request, sub, response_set)

def divergent(request, sub, response_set):
    divergent_set = DivergentResponseSet(response_set=response_set)
    divergent_set.save()
    stimuli = list(Stimulus.objects.filter(task=Stimulus.DIVERGENT))
    used = list(sub.used_divergent_stimuli.all())
    if len(used) > len(stimuli) - TRIAL_NUMBER:
        sub.used_divergent_stimuli.clear()
        used = []
    stimuli_to_use = []
    random.shuffle(stimuli)
    for i in range(len(stimuli)):
        if stimuli[i] not in used:
            stimuli_to_use.append(stimuli[i].stim)
            if len(stimuli_to_use) >= TRIAL_NUMBER:
                break
    random.shuffle(stimuli_to_use)

    return render(request, trial.html, {trial_type:"divergent", stimuli_to_use:mark_safe(json.dumps(stimuli_to_use))})

def convergent(request, sub, set):

def recombination(request, sub, set):

def block_design(request, sub, set):

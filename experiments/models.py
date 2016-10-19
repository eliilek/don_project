from __future__ import unicode_literals

from django.db import models
from django.shortcuts import reverse
from django.utils import timezone

# Create your models here.
class Stimulus(models.Model):
    class Meta:
        verbose_name_plural = "Stimuli"

    DIVERGENT = 'DIV'
    CONVERGENT = 'CON'
    RECOMBINATION = 'REC'
    BLOCK_DESIGN = 'BLO'
    TASK_CHOICES = (
        (DIVERGENT, 'Divergent'),
        (CONVERGENT, 'Convergent'),
        (RECOMBINATION, 'Recombination'),
        (BLOCK_DESIGN, 'Block Design'),
    )

    task = models.CharField(max_length = 3, choices=TASK_CHOICES)
    stim = models.CharField(max_length = 100, unique=True)

    def __unicode__(self):
        return self.get_task_display() + " - " + self.stim

class Subject(models.Model):
    subject_id = models.SmallIntegerField(primary_key=True)

    used_divergent_stimuli = models.ManyToManyField(Stimulus, related_name='divergent_subjects', blank=True)
    used_convergent_stimuli = models.ManyToManyField(Stimulus, related_name='convergent_subjects', blank=True)
    used_recombination_stimuli = models.ManyToManyField(Stimulus, related_name='recombination_subjects', blank=True)
    used_block_design_stimuli = models.ManyToManyField(Stimulus, related_name='block_design_subjects', blank=True)

    def get_absolute_url(self):
        return reverse("subject")

    def __unicode__(self):
        return "Subject " + str(self.subject_id)

class FullResponseSet(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='responses')
    created = models.DateTimeField(editable=False)
    completed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(FullResponseSet, self).save(*args, **kwargs)

    def date_time(self):
        return self.created

    def __unicode__(self):
        return "Trials from " + str(self.created)

class DivergentResponseSet(models.Model):
    response_set = models.ForeignKey(FullResponseSet, on_delete=models.CASCADE)

class DivergentResponse(models.Model):
    divergent_set = models.ForeignKey(DivergentResponseSet, on_delete=models.CASCADE)
    response_1 = models.CharField(max_length=50)
    response_2 = models.CharField(max_length=50)
    response_3 = models.CharField(max_length=50)
    response_4 = models.CharField(max_length=50)
    response_5 = models.CharField(max_length=50)
    time_1 = models.DurationField()
    time_2 = models.DurationField()
    time_3 = models.DurationField()
    time_4 = models.DurationField()
    time_5 = models.DurationField()
    total_time = models.DurationField()
    stimulus = models.ForeignKey(Stimulus, on_delete=models.PROTECT, null=True, blank=True)

class ConvergentResponseSet(models.Model):
    response_set = models.ForeignKey(FullResponseSet, on_delete=models.CASCADE)

class ConvergentResponse(models.Model):
    convergent_set = models.ForeignKey(ConvergentResponseSet, on_delete=models.CASCADE)
    response_1 = models.CharField(max_length=50)
    response_2 = models.CharField(max_length=50)
    response_3 = models.CharField(max_length=50)
    response_4 = models.CharField(max_length=50)
    response_5 = models.CharField(max_length=50)
    time_1 = models.DurationField()
    time_2 = models.DurationField()
    time_3 = models.DurationField()
    time_4 = models.DurationField()
    time_5 = models.DurationField()
    total_time = models.DurationField()
    stimulus = models.ForeignKey(Stimulus, on_delete=models.PROTECT, null=True, blank=True)

class RecombinationResponseSet(models.Model):
    response_set = models.ForeignKey(FullResponseSet, on_delete=models.CASCADE)

class RecombinationResponse(models.Model):
    recombination_set = models.ForeignKey(RecombinationResponseSet, on_delete=models.CASCADE)
    response_1 = models.CharField(max_length=5)
    response_2 = models.CharField(max_length=5)
    response_3 = models.CharField(max_length=5)
    response_4 = models.CharField(max_length=5)
    response_5 = models.CharField(max_length=5)
    time_1 = models.DurationField()
    time_2 = models.DurationField()
    time_3 = models.DurationField()
    time_4 = models.DurationField()
    time_5 = models.DurationField()
    total_time = models.DurationField()
    stimulus = models.ForeignKey(Stimulus, on_delete=models.PROTECT, null=True, blank=True)

class BlockDesignResponseSet(models.Model):
    response_set = models.ForeignKey(FullResponseSet, on_delete=models.CASCADE)

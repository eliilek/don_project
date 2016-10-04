from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Stimulus(models.Model):
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
    stim = models.CharField(max_length = 100)

class Subject(models.Model):
    used_divergent_stimuli = models.ManyToManyField(Stimulus)
    used_convergent_stimuli = models.ManyToManyField(Stimulus)
    used_recombination_stimuli = models.ManyToManyField(Stimulus)
    used_block_design_stimuli = models.ManyToManyField(Stimulus)

    def get_absolute_url(self):
        return reverse("subject")

class FullResponseSet(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    created = models.DateTimeField(editable=False)
    completed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(ResponseBlock, self).save(*args, **kwargs)

    def date_time(self):
        return self.created

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

class RecombinationResponseSet(models.Model):
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

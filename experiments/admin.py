from django.contrib import admin
from models import *

class SubjectAdmin(admin.ModelAdmin):
    exclude = ('used_divergent_stimuli', 'used_convergent_stimuli', 'used_block_design_stimuli', 'used_recombination_stimuli')

# Register your models here.
admin.site.register(Stimulus)
admin.site.register(Subject, SubjectAdmin)

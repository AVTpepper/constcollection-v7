from django.db import models


class Exhibition(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    artist_name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.CharField(max_length=500, help_text="Path to exhibition image in media folder")
    start_date = models.CharField(max_length=50, help_text="Display date, e.g., 'December 1, 2024'")
    end_date = models.CharField(max_length=50, help_text="Display date, e.g., 'January 15, 2025'")
    location = models.CharField(max_length=200, default='Main Gallery')
    is_current = models.BooleanField(default=False)
    is_upcoming = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0, help_text="Display order")

    class Meta:
        ordering = ['order', '-is_current', '-is_upcoming']

    def __str__(self):
        return self.title

    @property
    def status(self):
        if self.is_current:
            return 'Current'
        elif self.is_upcoming:
            return 'Upcoming'
        return 'Past'

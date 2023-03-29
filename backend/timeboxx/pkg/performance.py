import logging
import time
from typing import List

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def performance_stack_factory(name):
    return PerformanceStackImpl(name)


class PerformanceStack:
    class EmptyBlock:
        async def __aenter__(self):
            pass

        async def __aexit__(self, exc_type, exc_val, exc_tb):
            pass

    def __init__(self, name):
        pass

    def start_block(self, block_name):
        return PerformanceStack.EmptyBlock()

    def dump_metric(self):
        pass


class PerformanceStackImpl(PerformanceStack):
    class Block:
        _start_at = None
        _end_at = None

        def __init__(self, name) -> None:
            self._name = name

        async def __aenter__(self):
            self._start_at = time.time()

        async def __aexit__(self, exc_type, exc_val, exc_tb):
            self._end_at = time.time()

        @property
        def name(self):
            return self._name

        @property
        def start_at(self):
            return self._start_at

        @property
        def end_at(self):
            return self._end_at

    _stack: List[Block]
    _active_block_index = None

    def __init__(self, name) -> None:
        self._stack = []
        self._stack_name = name

    def start_block(self, block_name):
        self._active_block_index = len(self._stack)
        block = PerformanceStackImpl.Block(block_name)
        self._stack.append(block)
        return block

    def dump_metric(self):
        metric_str = f"✔️ Performance metric: {self._stack_name}\n"
        total_sec = 0
        for block in self._stack:
            if not (block.start_at and block.end_at):
                continue

            time_diff = block.end_at - block.start_at
            total_sec += time_diff
            if block.start_at and block.end_at:
                metric_str += f"🐣[{block.name}]: {time_diff:.2f} sec\n"
            else:
                metric_str += f"Unfinished block {block._name}\n"
        metric_str += f"⏱️ Total: {total_sec:.2f} sec"
        logger.info(metric_str)
